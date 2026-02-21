import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark backgrounds (near-black / charcoal)
        premium: {
          black: "#08080a",
          charcoal: "#0f0f12",
          slate: "#16161a",
          zinc: "#1e1e24",
          graphite: "#27272d",
          // Accent: cyan (#00b8db)
          accent: "#00b8db",
          "accent-hover": "#00a2c4",
          "accent-light": "#4dd4f0",
          "accent-muted": "rgba(0, 184, 219, 0.2)",
          "accent-glow": "rgba(0, 184, 219, 0.25)",
          // Alternate accents (use in components if needed)
          "accent-red": "#ff2e2e",
          "accent-red-hover": "#e62828",
          "accent-silver": "#c0c0c8",
          "accent-silver-hover": "#e0e0e8",
        },
        // Text
        "text-primary": "#fafafa",
        "text-secondary": "#a1a1aa",
        "text-muted": "#71717a",
        "text-disabled": "#52525b",
        // Semantic
        "border-default": "#27272d",
        error: "#ff3b3b",
        warning: "#ffaa00",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 5vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h1: [
          "clamp(2.25rem, 4vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h2: [
          "clamp(1.875rem, 3vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        h3: [
          "clamp(1.5rem, 2vw, 1.75rem)",
          { lineHeight: "1.2", fontWeight: "600" },
        ],
        h4: ["1.25rem", { lineHeight: "1.25", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.5" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
        overline: [
          "0.6875rem",
          { lineHeight: "1.3", fontWeight: "600", letterSpacing: "0.12em" },
        ],
      },
      spacing: {
        "section-y": "5rem", // 80px
        "section-y-lg": "7rem", // 112px
        "section-x": "1rem",
        "section-x-sm": "1.5rem",
        "section-x-lg": "2rem",
        "content-gap": "1.5rem",
        "content-gap-lg": "2rem",
        "title-margin": "3rem",
        "title-margin-lg": "4rem",
      },
      borderRadius: {
        sharp: "4px",
        card: "6px",
      },
      boxShadow: {
        "accent-glow": "0 0 24px rgba(0, 184, 219, 0.25)",
        "accent-glow-sm": "0 0 12px rgba(0, 184, 219, 0.2)",
      },
      transitionDuration: {
        fast: "150ms",
        ui: "200ms",
        card: "300ms",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "glow-pulse": "glowPulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 184, 219, 0.2)" },
          "50%": { boxShadow: "0 0 28px rgba(0, 184, 219, 0.35)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
