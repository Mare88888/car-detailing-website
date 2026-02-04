# Car Detailing Website — Documentation

## 1. Folder structure

```
Car Website/
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind + base styles, smooth scroll
│   │   ├── layout.tsx            # Root layout, fonts, Nav + Footer
│   │   └── page.tsx             # Home page (sections composition)
│   └── components/
│       ├── Nav.tsx              # Sticky nav, mobile menu, anchor links
│       ├── Hero.tsx             # Full-width hero, CTA
│       ├── Services.tsx         # Cleaning & Detailing categories
│       ├── Gallery.tsx          # Before/after gallery
│       ├── Pricing.tsx          # Pricing packages
│       ├── Testimonials.tsx     # Customer quotes
│       ├── Contact.tsx          # Booking / contact form
│       └── Footer.tsx           # Links, contact, social
├── public/                      # Static assets (optional)
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── tsconfig.json
├── package.json
└── DOCUMENTATION.md             # This file
```

---

## 2. Page routes

| Route | File               | Description                        |
| ----- | ------------------ | ---------------------------------- |
| `/`   | `src/app/page.tsx` | Single-page home with all sections |

The site is a **single-page layout**: one route (`/`) with sections reached via **anchor links** (`#services`, `#gallery`, `#pricing`, `#testimonials`, `#contact`). Smooth scrolling is enabled in `globals.css` via `scroll-behavior: smooth`.

---

## 3. Component breakdown

| Component        | Role                                                                                                                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Nav**          | Fixed/sticky header. Shows logo + links (Services, Gallery, Pricing, Testimonials, Book Now). Becomes solid on scroll; mobile hamburger with slide-down menu.                                              |
| **Hero**         | Full-viewport hero. Headline, subline, two CTAs (Book in now, View services). Dark gradient + subtle gold radial + grid overlay.                                                                           |
| **Services**     | Two columns: (1) **Cleaning & Valeting** — wash, interior, engine bay, quick valet; (2) **Detailing & Protection** — paint correction, ceramic, full detail, new car prep. Numbered headers and card grid. |
| **Gallery**      | Before/after grid. Each tile is split (before                                                                                                                                                              | after) with placeholder visuals; clickable for future lightbox. |
| **Pricing**      | Four packages (Quick valet, Full valet, Day detail, Like new) with price, description, feature list, “Get a quote” CTA. One package marked “Popular”.                                                      |
| **Testimonials** | Three quote cards (quote, author, role).                                                                                                                                                                   |
| **Contact**      | Form: name, email, phone, message. Submit shows thank-you state. Contact phone/email below.                                                                                                                |
| **Footer**       | Four columns: brand + tagline, quick links (same as nav), contact, social. Copyright and tagline.                                                                                                          |

---

## 4. Design principles used

- **Reference-inspired structure (not content)**  
  Layout and flow follow patterns common to detailing sites: hero → value → services → gallery → pricing → social proof → booking → footer. No content or branding copied from the reference.

- **Dark premium theme**  
  Dark background (`#0a0a0b`, charcoal, slate), light body text, gold/amber accent (`#c9a227`) for CTAs, highlights, and hover. Feels premium and automotive.

- **Clear hierarchy**  
  Display font (Playfair Display) for headings; sans (Outfit) for body and UI. Uppercase small labels + bold section titles + supporting copy.

- **Single primary CTA**  
  “Book in now” / “Book Now” is the main action in hero, nav, and footer. Secondary “View services” / “Get a quote” support discovery and conversion.

- **Smooth scrolling & sticky nav**  
  Anchor links scroll smoothly. Nav stays fixed; sections use `scroll-mt-20` so headings aren’t hidden under the nav.

- **Responsive design**  
  Breakpoints: mobile-first, then `sm`, `md`, `lg`. Nav collapses to hamburger; grids (services, gallery, pricing, testimonials) reflow; typography and spacing scale.

- **Accessibility**  
  Semantic HTML (`header`, `nav`, `section`, `footer`), form labels, focus rings on inputs/buttons, aria-label on mobile menu toggle.

- **Performance**  
  Next.js App Router, no heavy images (placeholder gradients in gallery), minimal JS (Nav/Contact state only).

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build: `npm run build` then `npm start`.
