# Smart H₂O Website — Deployment & DNS Guide

This guide takes you from the finished site to a live website at **smarth2o.com.na**, using **GitHub + Vercel + NamHost DNS**.

---

## Part 1 — Push the code to GitHub

1. Create a new repository on GitHub (e.g. `smarth2o-website`). Do **not** initialize it with a README.
2. In your terminal, from the project folder:

```bash
git init
git add .
git commit -m "Smart H2O website — initial launch version"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/smarth2o-website.git
git push -u origin main
```

---

## Part 2 — Deploy on Vercel

1. Go to **vercel.com** and sign in with your GitHub account.
2. Click **Add New → Project** and import the `smarth2o-website` repository.
3. Framework preset: **Next.js** (auto-detected). Leave all defaults.
4. Add one **Environment Variable**:

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | `file:./db/custom.db` |

5. Click **Deploy**. Vercel builds the site and gives you a temporary URL like `smarth2o-website.vercel.app`.

> **Note on the enquiry form:** the site currently saves enquiries to a SQLite file. On Vercel's serverless platform the file system is ephemeral (resets on each deploy). For production use, either:
> - Upgrade to a free hosted database (e.g. Vercel Postgres / Neon / Supabase) and update `DATABASE_URL` in the Prisma schema, **or**
> - Use a form service (e.g. Formspree) if you prefer zero database management.
> Ask your developer to switch the `datasource db` provider in `prisma/schema.prisma` accordingly.

---

## Part 3 — Connect smarth2o.com.na (NamHost DNS)

### Step 3.1 — Add the domain in Vercel

1. In your Vercel project: **Settings → Domains → Add** → enter `smarth2o.com.na`.
2. Also add `www.smarth2o.com.na` and set it to redirect to the apex domain.
3. Vercel will now show you the DNS records it expects, like:

   | Type | Name | Value |
   |------|------|-------|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

   *(Use the exact values Vercel shows you — the A record IP above is the standard one.)*

### Step 3.2 — Point DNS in NamHost control panel

1. Log in at **namhost.com** → your hosting/DNS control panel (DirectAdmin or cPanel).
2. Find **DNS Management / Zone Editor** for the domain `smarth2o.com.na`.
3. Edit or create these records:

   **Apex domain (smarth2o.com.na):**
   - If an `A` record for `@` exists → **edit** its value to Vercel's IP (e.g. `76.76.21.21`).
   - If not → **add**: Type `A`, Name `@`, Value `76.76.21.21`, TTL `3600`.

   **www subdomain:**
   - If a `CNAME` for `www` exists → **edit** its value to `cname.vercel-dns.com`.
   - If not → **add**: Type `CNAME`, Name `www`, Value `cname.vercel-dns.com`, TTL `3600`.

   **Remove conflicting records (important):**
   - Delete any existing `A` record for `@` pointing to a NamHost server IP (or the edit above replaces it).
   - Delete any existing `CNAME`/`A` for `www` pointing to NamHost.
   - You can keep MX (mail), SPF, and other records untouched — they don't affect the website.

4. Save. DNS propagation typically completes within **1–24 hours** (Namibian registries are usually fast; often under an hour).
5. Back in Vercel → **Settings → Domains**, the domain will show a green ✓ once it resolves.

### Step 3.3 — HTTPS

Vercel automatically issues and renews a **Let's Encrypt SSL certificate** for your domain once DNS points to it. No action needed.

---

## Part 4 — Before/after launch checklist

- [ ] Update the **WhatsApp number and phone number** in `src/lib/site.ts` (currently `+264 81 000 0000` placeholders)
- [ ] Update the **business email** in `src/lib/site.ts` if `info@smarth2o.com.na` is not correct — and make sure that mailbox exists (set it up in your NamHost mail or Google Workspace)
- [ ] Add a **favicon / logo** file if you have official brand assets
- [ ] Replace AI-generated machine photos with **real photos of your machines** when available (`public/images/`)
- [ ] Submit the site to **Google Search Console** and create a Business Profile for Smart H₂O

---

## Security reminders

- **Change your NamHost password immediately** — it was shared in chat. Use a password manager and unique passwords.
- Never share credentials in plain chat. For GitHub/Vercel, connect accounts directly; for NamHost, do the DNS changes yourself following the steps above (5 minutes).
