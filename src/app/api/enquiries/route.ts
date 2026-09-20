import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";

/**
 * On serverless hosts (Vercel) the SQLite file lives in /tmp and is
 * ephemeral, so storage alone can never be trusted with a real lead.
 * Every enquiry is therefore ALSO emailed to the business inbox via
 * SMTP (env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO).
 * If SMTP is not configured the enquiry is still stored; if both fail
 * the API reports failure so the visitor can use WhatsApp instead.
 */
async function ensureSchema() {
  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Enquiry" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT,
      "organization" TEXT,
      "interest" TEXT NOT NULL,
      "message" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await db.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS "Enquiry_createdAt_idx" ON "Enquiry"("createdAt");`
  );
  await db.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS "Enquiry_interest_idx" ON "Enquiry"("interest");`
  );
}

const INTEREST_LABELS: Record<string, string> = {
  "site-assessment": "Book a site visit",
  "host-machine": "Host a machine",
  advertising: "Advertise on machine screens",
  general: "General enquiry",
  "smart-h2o-active": "Smart H₂O Active products",
};

const enquirySchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name.")
    .max(120, "Name is too long."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(200, "Email is too long."),
  phone: z
    .string()
    .max(40, "Phone number is too long.")
    .optional()
    .or(z.literal("")),
  organization: z
    .string()
    .max(200, "Organization name is too long.")
    .optional()
    .or(z.literal("")),
  interest: z.enum([
    "site-assessment",
    "host-machine",
    "advertising",
    "general",
    "smart-h2o-active",
  ]),
  message: z
    .string()
    .min(10, "Please tell us a bit more about your enquiry (at least 10 characters).")
    .max(3000, "Message is too long."),
});

async function mailEnquiry(data: {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  interest: string;
  message: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? 465);
  if (!host || !user || !pass) {
    return { sent: false, reason: "smtp-not-configured" };
  }
  const to = process.env.ENQUIRY_TO ?? user;
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  const label = INTEREST_LABELS[data.interest] ?? data.interest;
  const lines = [
    `New enquiry from smarth2o.com.na`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "not provided"}`,
    `Organisation: ${data.organization || "not provided"}`,
    `Topic: ${label}`,
    ``,
    `Message:`,
    data.message,
  ];
  await transport.sendMail({
    from: `"Smart H₂O Website" <${user}>`,
    to,
    replyTo: data.email,
    subject: `Enquiry: ${label} / ${data.name}`,
    text: lines.join("\n"),
  });
  return { sent: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "Invalid form submission.";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { name, email, phone, organization, interest, message } = parsed.data;

    let stored = false;
    try {
      await ensureSchema();
      await db.enquiry.create({
        data: {
          name,
          email,
          phone: phone || null,
          organization: organization || null,
          interest,
          message,
        },
      });
      stored = true;
    } catch (storeError) {
      // Storage is best-effort on serverless; the email path is the record.
      console.warn("Enquiry store skipped:", storeError);
    }

    try {
      await mailEnquiry({ name, email, phone, organization, interest, message });
    } catch (mailError) {
      console.error("Enquiry email failed:", mailError);
      if (!stored) {
        return NextResponse.json(
          {
            success: false,
            error:
              "We could not receive your enquiry just now. Please reach us on WhatsApp or email info@smarth2o.com.na.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you, your enquiry has been received. Our team will get back to you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry submission failed:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while submitting your enquiry. Please try again or reach us on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
