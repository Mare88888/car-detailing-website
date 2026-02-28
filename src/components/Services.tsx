"use client";

import Image from "next/image";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { SectionEntrance } from "@/components/MotionSection";
import {
  staggerContainer,
  staggerItem,
  cardHover,
  buttonTap,
  ease,
} from "@/lib/motion";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* Icons as inline SVG for no asset dependency */
function CleaningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M24 8c-2 4-8 6-8 14 0 6.627 5.373 12 12 12s12-5.373 12-12c0-8-6-10-8-14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 26l4 4 8-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DetailingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M24 14v4M24 30v4M14 24h4M30 24h4M17.05 17.05l2.83 2.83M28.12 28.12l2.83 2.83M17.05 30.95l2.83-2.83M28.12 19.88l2.83-2.83"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const categories = [
  {
    id: "cleaning",
    key: "cleaning" as const,
    icon: CleaningIcon,
    href: "#car-cleaning",
    heroImage: "/cleaningServices.png",
    bgClass:
      "bg-gradient-to-br from-premium-slate via-premium-charcoal to-premium-black",
    patternClass:
      'before:content-[""] before:absolute before:inset-0 before:opacity-[0.03] before:bg-[radial-gradient(circle_at_30%_20%,rgba(0,184,219,0.4),transparent_50%)]',
  },
  {
    id: "detailing",
    key: "detailing" as const,
    icon: DetailingIcon,
    href: "#car-detailing",
    heroImage: "/vehicleDetailing.png",
    bgClass:
      "bg-gradient-to-br from-premium-charcoal via-premium-slate to-premium-black",
    patternClass:
      'before:content-[""] before:absolute before:inset-0 before:opacity-[0.03] before:bg-[radial-gradient(circle_at_70%_80%,rgba(0,184,219,0.4),transparent_50%)]',
  },
];

const CARD_TRANSITION = { duration: 0.2, ease };

export default function Services() {
  const t = useTranslations("services");
  const handleViewPackages = useCallback(
    (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      scrollToSection(sectionId);
    },
    [],
  );

  return (
    <SectionEntrance
      id="services"
      className="section-padding bg-premium-charcoal scroll-mt-20"
      aria-labelledby="services-heading"
    >
      <div className="container-narrow">
        <header className="text-center mb-12 sm:mb-16">
          <p className="text-premium-accent text-overline uppercase mb-2">
            {t("overline")}
          </p>
          <h2 id="services-heading" className="text-h2 text-text-primary">
            {t("heading")}
          </h2>
          <p className="mt-4 text-body text-text-secondary max-w-2xl mx-auto">
            {t("subheading")}
          </p>
        </header>

        <motion.div
          className="grid gap-6 sm:gap-8 lg:grid-cols-2"
          variants={staggerContainer}
          initial="visible"
          animate="visible"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.article
                key={category.id}
                variants={staggerItem}
                whileHover={cardHover}
                transition={CARD_TRANSITION}
                className="group relative overflow-hidden rounded-card border border-border-default bg-premium-slate transition-colors duration-300 hover:border-premium-accent/50 hover:shadow-xl hover:shadow-black/20"
              >
                {category.heroImage ? (
                  <>
                    <Image
                      src={category.heroImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 bg-premium-black/80"
                      aria-hidden
                    />
                  </>
                ) : (
                  <div
                    className={`absolute inset-0 ${category.bgClass} ${category.patternClass}`}
                    aria-hidden
                  />
                )}

                <div className="relative z-10 flex flex-col p-6 sm:p-8 lg:p-10 min-h-[280px] sm:min-h-[300px]">
                  <div className="mb-5 sm:mb-6">
                    <span className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-card bg-premium-accent-muted text-premium-accent transition-all duration-card group-hover:scale-110 group-hover:bg-premium-accent/20">
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                    </span>
                  </div>

                  <h3 className="text-h3 text-text-primary mb-3 sm:mb-4">
                    {t(`${category.key}.title`)}
                  </h3>
                  <p className="text-body-sm text-text-secondary flex-1 max-w-lg">
                    {t(`${category.key}.description`)}
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <motion.div whileTap={buttonTap}>
                      <Link
                        href="/"
                        onClick={handleViewPackages(
                          category.href.replace(/^#/, ""),
                        )}
                        className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 text-body-sm transition-all duration-ui group-hover:border-premium-accent group-hover:text-premium-accent"
                      >
                        {t(`${category.key}.viewPackages`)}
                        <svg
                          className="h-4 w-4 transition-transform duration-ui group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </SectionEntrance>
  );
}
