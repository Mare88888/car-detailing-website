# Deployment Guide — Vercel

Production-ready Next.js App Router car detailing site. Steps and advice for deploying on Vercel.

---

## 1. Pre-deploy checklist

- [ ] **Environment:** Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://yourdomain.com`) so metadata, sitemap, and robots use the correct base URL.
- [ ] **Content:** Replace placeholder phone/email in `Contact.tsx` and `Footer.tsx` with real contact details.
- [ ] **Gallery:** Replace picsum.photos URLs in `Gallery.tsx` with your own images (or keep for demo). Add any extra image domains to `next.config.js` → `images.remotePatterns` if you host images elsewhere.
- [ ] **Build:** Run `npm run build` locally and fix any errors before pushing.

---

## 2. Deploy to Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow prompts (link to existing project or create new). For production:

```bash
vercel --prod
```

### Option B: Git integration (recommended)

1. Push the project to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) → **Add New Project**.
3. Import the repo; Vercel will detect Next.js and set build settings.
4. **Build Command:** `next build` (default).  
   **Output Directory:** (leave default).  
   **Install Command:** `npm install` (default).
5. Add environment variable:
   - **Name:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://yourdomain.com` (or your Vercel URL, e.g. `https://your-project.vercel.app`)
6. Click **Deploy**. Each push to the main branch will trigger a new deployment.

---

## 3. Environment variables

| Variable               | Required    | Description                                                                                       |
| ---------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Full production URL (e.g. `https://yourdomain.com`). Used for metadata base, sitemap, and robots. |

Set in Vercel: **Project → Settings → Environment Variables**. Use **Production** (and optionally Preview) so all deployments use the correct URL.

---

## 4. Custom domain (Vercel)

1. **Project → Settings → Domains**.
2. Add your domain (e.g. `yourdomain.com`).
3. Follow Vercel’s DNS instructions (A/CNAME or nameservers).
4. Update `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com` and redeploy if needed.

---

## 5. Performance and production

- **Images:** Next.js `Image` is used for Hero and Gallery; keep images in `public/` or on allowed remote domains in `next.config.js`.
- **Fonts:** Inter is loaded via `next/font/google` (no external font request at runtime).
- **Static:** The home page is statically generated (`next build`); no server needed for the main route.
- **Compression:** `compress: true` is set in `next.config.js` (default on Vercel).
- **Strict mode:** `reactStrictMode: true` is enabled for safer React behaviour.

---

## 6. After deployment

- Open `https://your-domain.com/sitemap.xml` and `https://your-domain.com/robots.txt` to confirm they use your production URL (if `NEXT_PUBLIC_SITE_URL` is set).
- Test on real devices and with Lighthouse (Performance, Accessibility, SEO).
- Optional: set up Vercel Analytics or Speed Insights from the Vercel dashboard.

---

## 7. Project structure (reference)

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx      # Root layout, metadata, viewport
│   ├── page.tsx       # Home page
│   ├── robots.ts      # /robots.txt
│   └── sitemap.ts     # /sitemap.xml
├── components/
│   ├── index.ts       # Barrel exports
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Gallery.tsx
│   ├── Hero.tsx
│   ├── MotionSection.tsx
│   ├── Nav.tsx
│   ├── Pricing.tsx
│   ├── Services.tsx
│   └── Testimonials.tsx
└── lib/
    └── motion.ts
```

All sections are assembled on the single home route; layout provides Nav + Footer and SEO metadata. Components are reusable and exported from `@/components` for cleaner imports.

---

## 8. Quick tips

- **Node version:** Vercel uses Node 18.x by default for Next.js. To pin a version, add an `engines` field in `package.json`, e.g. `"engines": { "node": ">=18" }`, or set it in **Project → Settings → General → Node.js Version**.
- **Preview deployments:** Every branch/PR gets a unique URL. Use these to test before merging; set `NEXT_PUBLIC_SITE_URL` for Preview if you need correct URLs in preview builds.
- **Build logs:** If a deploy fails, check **Deployments → [deployment] → Building** for the exact error. Fix locally with `npm run build` and push again.
- **Analytics & Speed Insights:** In the Vercel dashboard, enable **Analytics** and **Speed Insights** (optional) for real-user metrics and Core Web Vitals.
- **.env.local:** Never commit secrets. Use Vercel’s **Environment Variables** for production; `.env.local` is for local development only and is in `.gitignore`.
