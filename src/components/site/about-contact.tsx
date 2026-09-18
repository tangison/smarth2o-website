"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, MessageCircle } from "lucide-react";
import { INTEREST_OPTIONS, SITE } from "@/lib/site";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  organization: z.string().optional(),
  interest: z.enum([
    "site-assessment",
    "host-machine",
    "advertising",
    "general",
    "smart-h2o-active",
  ], {
    message: "Please select what your enquiry is about.",
  }),
  message: z
    .string()
    .min(10, "Please tell us a bit more, at least 10 characters.")
    .max(3000, "Message is too long."),
});

type FormValues = z.infer<typeof formSchema>;

function EnquiryForm() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      interest: "general",
      message: "",
    },
  });

  const interestValue = watch("interest");

  // Preselect the interest when a CTA with data-interest is clicked anywhere
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.(
        "a[data-interest]"
      ) as HTMLElement | null;
      if (anchor?.dataset.interest) {
        const value = anchor.dataset.interest as FormValues["interest"];
        if (INTEREST_OPTIONS.some((o) => o.value === value)) {
          setValue("interest", value);
        }
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [setValue]);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setSubmitted(true);
        reset();
        toast({
          title: "Enquiry received",
          description:
            "Our team will get back to you shortly. For anything urgent, WhatsApp us.",
        });
      } else {
        toast({
          title: "Could not submit enquiry",
          description:
            data?.error ??
            "Something went wrong. Please try again or reach us on WhatsApp.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description:
          "We could not reach the server. Please try again or contact us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-rule rounded-lg p-8 md:p-10 bg-paper">
        <h3 className="text-xl font-bold text-primary">
          Thank you, we have your enquiry
        </h3>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-steel max-w-[46ch]">
          A member of the Smart H₂O team will review it and come back to you.
          Need something urgent? Message us on WhatsApp.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={SITE.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-primary text-primary text-sm font-semibold px-5 py-3 rounded-md hover:bg-secondary transition-colors"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp us
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-sm font-semibold text-primary underline underline-offset-2 decoration-accent hover:decoration-2 transition-all px-3 py-3"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[0.8125rem] font-semibold text-primary">
            Full name *
          </Label>
          <Input
            id="name"
            placeholder="Anna Nakale"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-[0.75rem] text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[0.8125rem] font-semibold text-primary">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@organisation.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[0.75rem] text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[0.8125rem] font-semibold text-primary">
            Phone or WhatsApp
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+264 ..."
            autoComplete="tel"
            {...register("phone")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="organization" className="text-[0.8125rem] font-semibold text-primary">
            Organisation
          </Label>
          <Input
            id="organization"
            placeholder="UNAM, hospital, company"
            autoComplete="organization"
            {...register("organization")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="interest" className="text-[0.8125rem] font-semibold text-primary">
          What is your enquiry about? *
        </Label>
        <Select
          onValueChange={(v) =>
            setValue("interest", v as FormValues["interest"], {
              shouldValidate: true,
            })
          }
          value={interestValue}
        >
          <SelectTrigger id="interest" className="w-full" aria-invalid={!!errors.interest}>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {INTEREST_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.interest && (
          <p className="text-[0.75rem] text-destructive">{errors.interest.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-[0.8125rem] font-semibold text-primary">
          Message *
        </Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell us about your facility, location, or question."
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-[0.75rem] text-destructive">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary text-white text-sm font-semibold px-6 py-3.5 rounded-md hover:bg-foreground transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send enquiry
          </>
        )}
      </button>
      <p className="text-[0.75rem] text-steel">
        By submitting you agree to be contacted about your enquiry. We never
        share your details.
      </p>
    </form>
  );
}

export function AboutContact() {
  return (
    <section id="about" className="bg-mist border-t border-rule">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* About + direct contact */}
          <div>
            <h2 className="text-3xl md:text-[2.4rem] leading-[1.12] font-bold tracking-[-0.01em] text-primary">
              Namibian owned.
              <br />
              Windhoek first.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-steel max-w-[52ch]">
              {SITE.legalName} is a Namibian business. We install and maintain
              water-refill machines where people already spend their day, and
              the team servicing them lives and works here.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel max-w-[52ch]">
              Windhoek is our initial operating market. As the network of
              refill points grows, so does our reach across Namibia.
            </p>

            <ul className="mt-8 border-t border-rule">
              <li className="border-b border-rule py-4 flex items-baseline justify-between gap-6">
                <span className="mono-label text-steel shrink-0">Email</span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-[0.9375rem] font-medium text-primary hover:text-accent transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="border-b border-rule py-4 flex items-baseline justify-between gap-6">
                <span className="mono-label text-steel shrink-0">Phone</span>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="text-[0.9375rem] font-medium text-primary hover:text-accent transition-colors"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="border-b border-rule py-4 flex items-baseline justify-between gap-6">
                <span className="mono-label text-steel shrink-0">WhatsApp</span>
                <a
                  href={SITE.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-primary hover:text-accent transition-colors"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {SITE.whatsapp}
                </a>
              </li>
              <li className="border-b border-rule py-4 flex items-baseline justify-between gap-6">
                <span className="mono-label text-steel shrink-0">Based in</span>
                <span className="text-[0.9375rem] font-medium text-primary">
                  {SITE.location}
                </span>
              </li>
            </ul>
          </div>

          {/* Enquiry form */}
          <div id="contact" className="scroll-mt-24 border border-rule rounded-lg bg-paper p-6 md:p-10">
            <h3 className="text-xl font-bold text-primary">Send us an enquiry</h3>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-foreground/75">
              Tell us what you need and we will get back to you.
            </p>
            <div className="mt-6">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
