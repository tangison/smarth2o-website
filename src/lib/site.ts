/**
 * Smart H₂O Solutions and Trading CC, site-wide constants.
 * Update contact details here once final numbers are confirmed.
 */

export const SITE = {
  name: "Smart H₂O",
  legalName: "Smart H₂O Solutions and Trading CC",
  domain: "smarth2o.com.na",
  url: "https://smarth2o.com.na",
  tagline: "Purified water. Smart machines. Namibia.",
  // ⚠️ PLACEHOLDER, replace with the official business phone / WhatsApp number
  whatsapp: "+264 81 000 0000",
  whatsappLink:
    "https://wa.me/26481000000?text=Hello%20Smart%20H2O%2C%20I%20would%20like%20to%20find%20out%20more%20about%20your%20water%20refill%20solutions.",
  // ⚠️ PLACEHOLDER, replace with the official business email
  email: "info@smarth2o.com.na",
  phone: "+264 81 000 0000",
  location: "Windhoek, Namibia",
} as const;

export const NAV_LINKS = [
  { href: "#solutions", label: "Vending" },
  { href: "#institutions", label: "Institutions" },
  { href: "#advertising", label: "Advertising" },
  { href: "#how-it-works", label: "Process" },
  { href: "#quality", label: "Quality" },
  { href: "#contact", label: "Contact" },
] as const;

export const INTEREST_OPTIONS = [
  { value: "site-assessment", label: "Request a site assessment" },
  { value: "host-machine", label: "Host a machine" },
  { value: "advertising", label: "Advertise on machine screens" },
  { value: "general", label: "General enquiry" },
  { value: "smart-h2o-active", label: "Smart H₂O Active products" },
] as const;
