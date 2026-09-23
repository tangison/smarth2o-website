/**
 * Smart H₂O Solutions and Trading CC, site-wide constants.
 *
 * Contact policy (confirmed by the owner):
 * - Email is public: info@smarth2o.com.na
 * - The WhatsApp number is the owner's phone. It powers every
 *   click-to-chat link but is never printed as text on the site.
 */

export const SITE = {
  name: "Smart H₂O",
  legalName: "Smart H₂O Solutions and Trading CC",
  domain: "smarth2o.com.na",
  url: "https://smarth2o.com.na",
  tagline: "Water where people are.",
  whatsapp: "+264 81 125 4445",
  whatsappLink:
    "https://wa.me/264811254445?text=Hello%20Smart%20H2O%2C%20I%20would%20like%20to%20find%20out%20more%20about%20your%20water%20refill%20solutions.",
  email: "info@smarth2o.com.na",
  location: "Windhoek, Namibia",
  // One allowed nod to what is coming, kept out of the main offer.
  teaser: "Bottles, apparel and the Smart H₂O Café are in the pipeline.",
} as const;

/** Primary header navigation. */
export const NAV_LINKS = [
  { href: "/vending", label: "Vending" },
  { href: "/institutions", label: "Institutions" },
  { href: "/advertising", label: "Advertising" },
  { href: "/how-it-works", label: "Process" },
  { href: "/quality", label: "Quality" },
  { href: "/about", label: "About" },
] as const;

/** Complete page index used by the footer, search and the mobile menu. */
export const PAGE_LINKS = [
  { href: "/", label: "Home", hint: "Smart water-refill solutions for Namibian facilities" },
  { href: "/vending", label: "Water Vending Solutions", hint: "Purified refill water, cashless access, high-capacity machines" },
  { href: "/institutions", label: "Solutions for Institutions", hint: "Campuses, hospitals, offices, centres, gyms and public facilities" },
  { href: "/advertising", label: "Screen Advertising", hint: "Reach people where they refill" },
  { href: "/how-it-works", label: "How It Works", hint: "From site visit to monitored performance" },
  { href: "/quality", label: "Quality and Maintenance", hint: "Water quality, preventive servicing, sustainability" },
  { href: "/active", label: "Smart H₂O Active", hint: "Bottles and hydration accessories" },
  { href: "/about", label: "About", hint: "Namibian owned, Windhoek first" },
  { href: "/contact", label: "Contact", hint: "Enquiry form, email and WhatsApp" },
  { href: "/brand", label: "Brand", hint: "Logo, colours and type" },
] as const;

export const INTEREST_OPTIONS = [
  { value: "site-assessment", label: "Book a site visit" },
  { value: "host-machine", label: "Host a machine" },
  { value: "advertising", label: "Advertise on machine screens" },
  { value: "general", label: "General enquiry" },
  { value: "smart-h2o-active", label: "Smart H₂O Active products" },
] as const;
