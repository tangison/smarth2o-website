import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * On serverless hosts (Vercel) the SQLite file lives in /tmp and may not
 * exist yet. Ensure the table exists before the first write. Safe to run
 * on every request: CREATE TABLE IF NOT EXISTS is a no-op afterwards.
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

    try {
      await ensureSchema();
    } catch {
      // Local dev: schema already exists via prisma db push. Ignore.
    }

    const enquiry = await db.enquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        organization: organization || null,
        interest,
        message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: enquiry.id,
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
