  # Shambhu Patil — MBA Portfolio

A production-ready, full-stack portfolio built with **Vue 3 · Vite · Pinia · Tailwind CSS v4 · Supabase**.

---

## Table of Contents

1. [Local Development](#1-local-development)
2. [Supabase Database Setup](#2-supabase-database-setup)
3. [Supabase Edge Function (Email)](#3-supabase-edge-function-email)
4. [Deploying to GitHub Pages](#4-deploying-to-github-pages)
5. [GitHub Actions Secrets Reference](#5-github-actions-secrets-reference)
6. [Custom Domain (Optional)](#6-custom-domain-optional)
7. [Updating Content](#7-updating-content)

---

## 1. Local Development

```bash
# Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>/portfolio

# Install dependencies
npm install

# Start the dev server → http://localhost:5173
npm run dev
```

**`.env.local`** (already pre-filled — never commit this file):

```env
VITE_SUPABASE_URL=https://uaysqqiusqfzluvgiacv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

VITE_EMAILJS_SERVICE_ID=service_mb1rrgf
VITE_EMAILJS_TEMPLATE_ID=template_59d824o
VITE_EMAILJS_PUBLIC_KEY=<your-emailjs-public-key>
```

> The Supabase **anon key** is safe to expose in the browser bundle — Row Level Security gates all writes. Never commit your Supabase **service-role key**.

---

## 2. Supabase Database Setup

Run the schema **once** in your Supabase project's SQL Editor:

**Dashboard → SQL Editor → New Query → paste contents of `supabase/schema.sql` → Run**

This creates two tables and configures RLS + grants:

| Table | Purpose |
|-------|---------|
| `contact_messages` | Stores contact form submissions (append-only for visitors) |
| `portfolio_recommendations` | Public guestbook; visitors submit, you approve via Dashboard |

**Verify it worked:**

```sql
SELECT tablename, rowsecurity
  FROM pg_tables
 WHERE schemaname = 'public'
   AND tablename IN ('contact_messages', 'portfolio_recommendations');
-- Both rows should show rowsecurity = true
```

**To approve a recommendation:**

Dashboard → Table Editor → `portfolio_recommendations` → find the row → set `is_approved = true` → Save.
It appears on the live site on the visitor's next page load.

---

## 3. Supabase Edge Function (Email)

The contact form stores messages in Supabase **and** forwards them to your inbox via [Resend](https://resend.com).

### 3a. Install Supabase CLI

```bash
npm install -g supabase
```

### 3b. Link to your project

```bash
supabase login
supabase link --project-ref uaysqqiusqfzluvgiacv
```

### 3c. Deploy the function

```bash
# Run from the portfolio/ directory
supabase functions deploy contact-handler
```

### 3d. Set the function's secrets

```bash
supabase secrets set RESEND_API_KEY=re_eUiPWXUB_VU4L5HEDtaHGnGeThT9eKqp1
supabase secrets set NOTIFY_TO=your-real-inbox@gmail.com
supabase secrets set NOTIFY_FROM=portfolio@resend.dev
```

> `NOTIFY_FROM` must be a domain verified in Resend, or use `onboarding@resend.dev` for initial testing.

### 3e. Wire the database webhook

Dashboard → Database → Webhooks → **Create a new hook**

| Field | Value |
|-------|-------|
| Name | `contact-email-trigger` |
| Table | `contact_messages` |
| Events | `INSERT` |
| Type | Supabase Edge Functions |
| Edge Function | `contact-handler` |

---

## 4. Deploying to GitHub Pages

GitHub Pages serves static files. We build the Vue SPA and push `dist/` to the `gh-pages` branch automatically via GitHub Actions.

### 4a. Configure the Vite base path

If your repo is at `https://github.com/<user>/<repo>`, the site will be served at
`https://<user>.github.io/<repo>/`.

Open **`vite.config.js`** and add the `base` option:

```js
export default defineConfig({
  base: '/shambhu-portfolio/',   // ← add this line
  plugins: [vue(), tailwindcss()],
})
```

> If you use a **custom domain** (e.g. `shambhupatil.com`), use `base: '/'` instead.

### 4b. Add the GitHub Actions workflow

Create this file at the **repository root** (not inside `portfolio/`):

**`.github/workflows/deploy.yml`**

```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: portfolio/package-lock.json

      - name: Install dependencies
        working-directory: portfolio
        run: npm ci

      - name: Build
        working-directory: portfolio
        env:
          VITE_SUPABASE_URL:        ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY:   ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_EMAILJS_SERVICE_ID:  ${{ secrets.VITE_EMAILJS_SERVICE_ID }}
          VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.VITE_EMAILJS_TEMPLATE_ID }}
          VITE_EMAILJS_PUBLIC_KEY:  ${{ secrets.VITE_EMAILJS_PUBLIC_KEY }}
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: portfolio/dist
          force_orphan: true
```

### 4c. Add secrets to GitHub

Repository → **Settings → Secrets and variables → Actions → New repository secret**

Add each of the following:

| Secret name | Value |
|-------------|-------|
| `VITE_SUPABASE_URL` | `https://uaysqqiusqfzluvgiacv.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Full anon key from `keys.md` |
| `VITE_EMAILJS_SERVICE_ID` | `service_mb1rrgf` |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_59d824o` |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS public key (EmailJS Dashboard → Account) |

> `GITHUB_TOKEN` is injected automatically by GitHub Actions — do **not** add it manually.

### 4d. Enable GitHub Pages

Repository → **Settings → Pages**

| Field | Value |
|-------|-------|
| Source | Deploy from a branch |
| Branch | `gh-pages` / `/ (root)` |

Click **Save**. After the first workflow run completes (check the **Actions** tab), the site goes live at:

```
https://<your-username>.github.io/<your-repo>/
```

### 4e. Push to trigger the first deploy

```bash
git add .
git commit -m "initial deploy"
git push origin main
```

Watch the run in **Actions → Deploy Portfolio to GitHub Pages**.

---

## 5. GitHub Actions Secrets Reference

| Secret / Variable | Where it is used | How to find it |
|-------------------|-----------------|----------------|
| `VITE_SUPABASE_URL` | Supabase client (contact form, recommendations) | Supabase Dashboard → Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase client — public, RLS-gated | Supabase Dashboard → Project Settings → API → `anon` `public` key |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS fallback when Supabase not available | EmailJS Dashboard → Email Services → Service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS fallback | EmailJS Dashboard → Email Templates → Template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS fallback | EmailJS Dashboard → Account → General → Public Key |
| `RESEND_API_KEY` *(edge fn)* | Resend email delivery | Resend Dashboard → API Keys → Create API key |
| `NOTIFY_TO` *(edge fn)* | Your inbox address for contact alerts | Your own email address |
| `NOTIFY_FROM` *(edge fn)* | Sender address that appears in emails | A domain verified in Resend (or `onboarding@resend.dev` to test) |

Edge function secrets are set via the **Supabase CLI** (`supabase secrets set ...`), not via GitHub.
They live server-side only and never appear in the frontend bundle.

---

## 6. Custom Domain (Optional)

1. Buy a domain (e.g. `shambhupatil.com`).
2. In your DNS provider, add a **CNAME** record:
   ```
   Type:  CNAME
   Host:  www
   Value: <your-username>.github.io
   ```
   For an apex domain (`@`), add four **A records** pointing to GitHub's IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. Repository → **Settings → Pages → Custom domain** → enter `www.shambhupatil.com` → Save.
4. In `vite.config.js` set `base: '/'`.
5. GitHub provisions an SSL certificate automatically within ~15 minutes.

---

## 7. Updating Content

All portfolio text lives in one file — edit it and push:

```
portfolio/src/stores/portfolio.js  →  const DEFAULTS = { ... }
```

GitHub Actions will rebuild and redeploy automatically on every push to `main`.

| What to update | Location in `DEFAULTS` |
|---------------|------------------------|
| Name, title, tagline, summary | `hero.name / .title / .tagline / .summary` |
| Status pill text | `hero.status` |
| Achievement badges | `hero.badges[]` |
| Work / education entries | `experience[]` — copy an existing object |
| Project case studies | `projects[]` — copy an existing object |
| Skills radar labels & scores | `skills.radarLabels[]` and `skills.radarValues[]` (must stay same length) |
| Competency skill chips | `skills.groups[].skills[]` |
| Competency bar chart | `analytics_data.patterns[]` — each has `name`, `color`, `icon`, `pct` (0–100) |
| KPI numbers | `metrics.nationalWins / .certifications / .hscGrade` etc. |
| Contact details | `hero.email / .linkedin` and `ContactSection.vue → contactLinks[]` |
