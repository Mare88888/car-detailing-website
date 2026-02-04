# Premium animations (Framer Motion)

Subtle, fast, professional animations — no flashy effects.

## Setup

- **Package:** `framer-motion`
- **Config:** `src/lib/motion.ts` — shared durations, ease, and variants
- **Section wrapper:** `src/components/MotionSection.tsx` — `SectionEntrance` for in-view fade + slide up

## Where animations are used

| Area                  | Animation                                                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Section entrances** | Sections (Services, Gallery, Pricing, Testimonials, Contact) use `SectionEntrance`: fade in + slide up (24px) when in view, once.      |
| **Buttons**           | Hero CTAs, Services “View Packages”, Pricing “Get a quote”, Contact “Request booking”: `whileHover` scale 1.02, `whileTap` scale 0.98. |
| **Cards**             | Services cards, Pricing cards, Gallery comparison cards, Testimonials: stagger on entrance; hover lift (`y: -4`, 0.2s).                |
| **Hover effects**     | Card hover: subtle lift; button hover/tap: scale.                                                                                      |

## Reusable pieces

### 1. Section entrance (in-view, once)

```tsx
import { SectionEntrance } from "@/components/MotionSection";

<SectionEntrance id="my-section" className="section-padding ...">
  <header>...</header>
  <div>...</div>
</SectionEntrance>;
```

- Uses `useInView` (once, margin `-10%`).
- Animates: `opacity 0→1`, `y 24→0`, duration 0.5s, ease-out.

### 2. Staggered grid (cards)

```tsx
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion'

<motion.div
  className="grid ..."
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-8% 0px' }}
>
  {items.map((item) => (
    <motion.article key={item.id} variants={staggerItem} ...>
      ...
    </motion.article>
  ))}
</motion.div>
```

- Container: `staggerChildren: 0.08`, `delayChildren: 0.1`.
- Each item: fade + `y: 16→0`, duration 0.35s.

### 3. Card hover (lift)

```tsx
import { motion } from "framer-motion";
import { cardHover } from "@/lib/motion";

<motion.article
  whileHover={cardHover}
  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
  className="..."
>
  ...
</motion.article>;
```

- `cardHover` = `{ y: -4 }` (4px lift).

### 4. Button tap / hover

```tsx
import { motion } from "framer-motion";
import { buttonTap, buttonHover } from "@/lib/motion";

<motion.div whileHover={buttonHover} whileTap={buttonTap}>
  <Link href="..." className="btn-primary">
    Book Now
  </Link>
</motion.div>;
```

- `buttonTap`: scale 0.98.
- `buttonHover`: scale 1.02.

## Motion config (`src/lib/motion.ts`)

- **duration:** `fast: 0.2`, `normal: 0.35`, `slow: 0.5`
- **ease:** `[0.25, 0.46, 0.45, 0.94]`
- **sectionEntrance:** hidden → visible (opacity, y)
- **staggerContainer / staggerItem:** for grids
- **cardHover:** `y: -4`
- **buttonTap:** `scale: 0.98`
- **buttonHover:** `scale: 1.02`
- **fadeIn:** opacity only (e.g. modals)

All timings are short and use ease-out for a calm, premium feel.
