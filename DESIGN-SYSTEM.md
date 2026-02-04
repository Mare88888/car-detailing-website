# Dark Premium UI Theme — Design System

High-end car detailing / automotive performance feel. Dark, minimal, aggressive.

---

## 1. Color palette (hex)

### Backgrounds (dark)

| Token        | Hex       | Use                               |
| ------------ | --------- | --------------------------------- |
| **Black**    | `#08080a` | Page background, deepest contrast |
| **Charcoal** | `#0f0f12` | Section backgrounds, cards        |
| **Slate**    | `#16161a` | Elevated surfaces, inputs         |
| **Zinc**     | `#1e1e24` | Borders, dividers, subtle lift    |
| **Graphite** | `#27272d` | Hover states, active surfaces     |

### Text

| Token         | Hex       | Use                            |
| ------------- | --------- | ------------------------------ |
| **Primary**   | `#fafafa` | Headings, primary copy         |
| **Secondary** | `#a1a1aa` | Body, descriptions             |
| **Muted**     | `#71717a` | Captions, labels, placeholders |
| **Disabled**  | `#52525b` | Disabled UI                    |

### Accent options (pick one primary)

**Electric green (default — performance / go)**
| Token | Hex |
|-------|-----|
| Accent | `#00ff88` |
| Accent hover | `#00e67a` |
| Accent muted | `#00ff8833` (20% opacity) |
| Accent glow | `#00ff8840` (25% for glows) |

**Racing red (aggressive)**
| Token | Hex |
|-------|-----|
| Accent | `#ff2e2e` |
| Accent hover | `#e62828` |
| Accent muted | `#ff2e2e33` |
| Accent glow | `#ff2e2e40` |

**Metallic silver (sleek / premium)**
| Token | Hex |
|-------|-----|
| Accent | `#c0c0c8` |
| Accent hover | `#e0e0e8` |
| Accent muted | `#c0c0c833` |
| Accent glow | `#c0c0c840` |

### Semantic

| Token          | Hex            | Use                              |
| -------------- | -------------- | -------------------------------- |
| Border default | `#27272d`      | Default borders                  |
| Border focus   | Same as accent | Focus rings                      |
| Success        | `#00ff88`      | Success states (or match accent) |
| Error          | `#ff3b3b`      | Errors, destructive              |
| Warning        | `#ffaa00`      | Warnings                         |

---

## 2. Typography scale

**Font stack:** Inter or Poppins (clean sans-serif). Single family for a minimal, aggressive look; optional second font for display only.

| Role           | Size (rem)             | Weight  | Line height | Letter-spacing | Use                       |
| -------------- | ---------------------- | ------- | ----------- | -------------- | ------------------------- |
| **Display**    | 3.5–4.5 rem (56–72px)  | 700–800 | 1.05        | -0.02em        | Hero headline             |
| **H1**         | 2.5–3 rem (40–48px)    | 700     | 1.1         | -0.02em        | Page title                |
| **H2**         | 2–2.25 rem (32–36px)   | 700     | 1.15        | -0.01em        | Section title             |
| **H3**         | 1.5–1.75 rem (24–28px) | 600     | 1.2         | 0              | Subsection                |
| **H4**         | 1.25 rem (20px)        | 600     | 1.25        | 0              | Card title                |
| **Body large** | 1.125 rem (18px)       | 400     | 1.5         | 0              | Lead paragraph            |
| **Body**       | 1 rem (16px)           | 400     | 1.5         | 0              | Default copy              |
| **Body small** | 0.875 rem (14px)       | 400     | 1.5         | 0              | Secondary copy            |
| **Caption**    | 0.75 rem (12px)        | 500     | 1.4         | 0.05em         | Labels, overlines         |
| **Overline**   | 0.6875 rem (11px)      | 600     | 1.3         | 0.12em         | Section label (uppercase) |

**Rules:**

- Headings: bold (600–800), tight tracking, single clean sans.
- Overlines: uppercase, wide letter-spacing, small size.
- No serifs in body for this theme; keep it sharp and automotive.

---

## 3. Button styles

### Primary (accent CTA)

- **Background:** Accent (e.g. `#00ff88`)
- **Text:** Black `#08080a`, weight 600
- **Padding:** 14px 28px (py-3.5 px-7)
- **Border radius:** 2–4px (sharp) or 6px (slightly soft)
- **Font:** 0.875rem (14px), uppercase optional for “Book now” style
- **Hover:** Slightly lighter/darker accent + slight scale (1.02) or brightness
- **Active:** Scale 0.98
- **Focus:** 2px ring, accent color, offset 2px

### Secondary (outline)

- **Background:** Transparent
- **Border:** 1.5px solid zinc/graphite `#27272d`
- **Text:** Primary white or accent
- **Padding:** Same as primary
- **Hover:** Border → accent, text → accent (or white)
- **Focus:** Ring as primary

### Ghost / tertiary

- **Background:** Transparent
- **Border:** None
- **Text:** Secondary or accent
- **Hover:** Background `accent muted` (e.g. `#00ff881a`), text accent or white

### Destructive

- **Background:** `#ff3b3b` or transparent with red border
- **Text:** White or red
- **Hover:** Darker red

**Aggressive touch:** Slight corner radius (2–6px), bold weight, optional uppercase + letter-spacing on primary.

---

## 4. Section spacing rules

- **Section padding (vertical):** 80px–120px (5rem–7.5rem). Use 80px on mobile, 96px tablet, 120px desktop.
- **Section padding (horizontal):** 16px mobile, 24px tablet, 32px desktop (align with grid).
- **Container max-width:** 1280px (80rem) or 1152px (72rem) for content; center with auto margins.
- **Gap between sections:** Consistent padding only; no extra margin between sections (padding creates the rhythm).
- **In-section spacing:**
  - Section title to content: 48px–64px (3rem–4rem).
  - Card grid gap: 24px–32px (1.5rem–2rem).
  - Block (e.g. text block) to next block: 24px–32px.

**Tailwind-style tokens:**

- `section-padding-y`: `py-20 lg:py-28` (80px / 112px)
- `section-padding-x`: `px-4 sm:px-6 lg:px-8`
- `content-gap`: `gap-6 lg:gap-8`
- `title-margin`: `mb-12 lg:mb-16`

---

## 5. Hover & animation ideas

### Hover

- **Links:** Color → accent, optional underline (1px, accent) with 0.15s ease.
- **Cards:** Border zinc → accent at 40% opacity; background subtle lift (e.g. slate → zinc); transition 0.2s ease.
- **Buttons (primary):** Brightness 1.05 or lighten accent; transform scale(1.02); 0.2s ease.
- **Buttons (secondary):** Border and text to accent; 0.2s ease.
- **Images (e.g. gallery):** Slight scale(1.03) + subtle overlay (e.g. accent 10%); 0.3s ease.

### Animation

- **Page load / section in view:** Fade-in + slide-up (opacity 0→1, translateY 12–20px→0), 0.5–0.6s ease-out; stagger children by 0.05–0.1s.
- **Hero:** Headline and CTA with short delay (0.1–0.2s) after load.
- **Numbers / stats:** Count-up or simple fade-in when in viewport.
- **Accent glow:** Subtle box-shadow or pseudo-element pulse on primary CTA (e.g. accent at 20–30% opacity, 2–3s loop).
- **Micro:** Button press scale(0.98); focus ring 0.15s ease.

### Performance / automotive feel

- **Fast, short transitions:** 0.15–0.25s for UI; 0.3s max for cards/imagery.
- **Easing:** `ease-out` for enter; `ease-in-out` for hover.
- **Avoid:** Bouncy or playful easing; keep it tight and precise.
- **Optional:** Thin accent underline that “draws” on hover (width 0→100%, 0.2s).

---

## Quick reference (Electric Green theme)

```css
/* Backgrounds */
--bg-black: #08080a;
--bg-charcoal: #0f0f12;
--bg-slate: #16161a;
--bg-zinc: #1e1e24;

/* Text */
--text-primary: #fafafa;
--text-secondary: #a1a1aa;
--text-muted: #71717a;

/* Accent (electric green) */
--accent: #00ff88;
--accent-hover: #00e67a;
--accent-muted: rgba(0, 255, 136, 0.2);
```

Use this with **strong contrast** (white on black, green on black), **large bold headings**, and **minimal decoration** for a dark, premium, automotive look.
