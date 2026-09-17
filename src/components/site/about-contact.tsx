"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Loader2, Mail, Phone, MapPin, Send, MessageCircle, Compass } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";
import { INTEREST_OPTIONS, SITE } from "@/lib/site";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  organization: z.string().optional(),
  interest: z.enum(["site-assessment", "host-machine", "general", "smart-h2o-active"], {
    message: "Please select what your enquiry is about.",
  }),
  message: z
    .string()
    .min(10, "Please tell us a bit more (at least 10 characters).")
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
            "Thank you — our team will get back to you shortly. For anything urgent, WhatsApp us.",
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
      <Card className="border-teal-200 bg-accent/30 h-full">
        <CardContent className="p-8 md:p-10 flex flex-col items-center text-center justify-center h-full">
          <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-teal-100 text-teal-700 mb-5">
            <Send className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            Thank you — we have your enquiry
          </h3>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-sm leading-relaxed">
            A member of the Smart H₂O team will review it and get back to you
            shortly. Need something urgent? Message us on WhatsApp.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="gap-2">
              <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp us
              </a>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setSubmitted(false)}
              className="text-teal-700"
            >
              Submit another enquiry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-border/80 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Send us an enquiry</CardTitle>
        <CardDescription>
          Tell us what you need and we will get back to you. Site assessments in
          Windhoek are typically arranged promptly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name *</Label>
              <Input
                id="name"
                placeholder="e.g. Anna Nakale"
                autoComplete="name"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@organisation.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone / WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+264 ..."
                autoComplete="tel"
                {...register("phone")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organisation</Label>
              <Input
                id="organization"
                placeholder="e.g. UNAM, hospital, company"
                autoComplete="organization"
                {...register("organization")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest">What is your enquiry about? *</Label>
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
              <p className="text-sm text-destructive">{errors.interest.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Tell us about your facility, location, or question..."
              aria-invalid={!!errors.message}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full bg-water-cta text-white hover:opacity-90 gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Send enquiry
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By submitting, you agree to be contacted about your enquiry. We never
            share your details.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export function AboutContact() {
  return (
    <section id="about" className="py-20 md:py-28 bg-muted/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About & Contact"
          title="Namibian-owned. Windhoek-first. Built to expand."
          description="Smart H₂O Solutions and Trading CC is a Namibian business focused on practical, service-backed water solutions."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* About + contact details */}
          <div className="space-y-6">
            <Reveal>
              <Card className="border-border/80">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    {SITE.legalName}
                  </h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                    Smart H₂O is Namibian-owned and Namibia-focused. Our service
                    model is built around one principle: reliable machines, looked
                    after by people who live and work here. Windhoek is our initial
                    operating market, and every installation is backed by a local
                    technical team that knows the machines it maintains.
                  </p>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                    Our vision reaches further. As the network of refill points
                    grows, Smart H₂O intends to expand across Namibia — bringing
                    smart hydration infrastructure, the Active product range and
                    related services to more communities, institutions and public
                    spaces.
                  </p>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                    <li className="flex items-start gap-3 text-sm text-foreground/80">
                      <MapPin className="h-5 w-5 text-teal-600 shrink-0" aria-hidden="true" />
                      <span>
                        <strong className="block text-foreground">Based in</strong>
                        Windhoek, Namibia
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-foreground/80">
                      <Compass className="h-5 w-5 text-teal-600 shrink-0" aria-hidden="true" />
                      <span>
                        <strong className="block text-foreground">Vision</strong>
                        Expansion across Namibia
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <Card className="border-border/80">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    Reach us directly
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="group flex items-center gap-3 rounded-lg border border-border p-4 hover:border-teal-300 hover:bg-accent/50 transition-colors"
                      >
                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-accent text-teal-700 shrink-0">
                          <Mail className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-foreground">
                            Email
                          </span>
                          <span className="block text-sm text-muted-foreground group-hover:text-teal-800">
                            {SITE.email}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                        className="group flex items-center gap-3 rounded-lg border border-border p-4 hover:border-teal-300 hover:bg-accent/50 transition-colors"
                      >
                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-accent text-teal-700 shrink-0">
                          <Phone className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-foreground">
                            Telephone
                          </span>
                          <span className="block text-sm text-muted-foreground group-hover:text-teal-800">
                            {SITE.phone}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={SITE.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-lg border border-border p-4 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                      >
                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                          <MessageCircle className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-foreground">
                            WhatsApp
                          </span>
                          <span className="block text-sm text-muted-foreground group-hover:text-emerald-700">
                            {SITE.whatsapp} — chat with us now
                          </span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          {/* Enquiry form */}
          <Reveal delay={0.12}>
            <div id="contact" className="scroll-mt-24">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
