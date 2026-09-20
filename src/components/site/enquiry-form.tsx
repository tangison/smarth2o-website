"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
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

const VALID_INTERESTS = INTEREST_OPTIONS.map((o) => o.value) as unknown as string[];

export function EnquiryForm() {
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

  // Display state mirrors the form field so the trigger always shows a value
  const [interestValue, setInterestValue] = useState<FormValues["interest"]>("general");

  // Preselect the interest from ?interest= (CTAs link here from every page)
  useEffect(() => {
    try {
      const param = new URLSearchParams(window.location.search).get("interest");
      if (param && VALID_INTERESTS.includes(param)) {
        setInterestValue(param as FormValues["interest"]);
        setValue("interest", param as FormValues["interest"]);
      }
    } catch {
      /* no URLSearchParams support: the select stays as-is */
    }
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
      <div className="border border-rule rounded-2xl p-8 md:p-10 bg-paper">
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
            className="inline-flex items-center justify-center gap-2 border border-primary text-primary text-sm font-semibold px-5 py-3 rounded-full hover:bg-secondary transition-colors"
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
          onValueChange={(v) => {
            const next = v as FormValues["interest"];
            setInterestValue(next);
            setValue("interest", next, { shouldValidate: true });
          }}
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
        className="w-full bg-primary text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-foreground transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
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

/** Contact rows: email, click-to-chat WhatsApp (number never printed), location. */
export function ContactRows({ className }: { className?: string }) {
  return (
    <ul className={`border-t border-rule ${className ?? ""}`}>
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
        <span className="mono-label text-steel shrink-0">WhatsApp</span>
        <a
          href={SITE.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-primary hover:text-accent transition-colors"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Chat with us
        </a>
      </li>
      <li className="border-b border-rule py-4 flex items-baseline justify-between gap-6">
        <span className="mono-label text-steel shrink-0">Based in</span>
        <span className="text-[0.9375rem] font-medium text-primary">
          {SITE.location}
        </span>
      </li>
      <li className="border-b border-rule py-4 flex items-baseline justify-between gap-6">
        <span className="mono-label text-steel shrink-0">On the way</span>
        <span className="text-[0.875rem] text-steel max-w-[34ch] text-right">
          {SITE.teaser}
        </span>
      </li>
    </ul>
  );
}
