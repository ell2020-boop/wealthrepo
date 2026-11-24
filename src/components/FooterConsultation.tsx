import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/siteData';
import {
  HairlineDivider,
  MaskedInViewReveal,
  MagneticLink,
  EXPO_EASE,
} from './MotionPrimitives';

const QUOTE_INTERVAL_MS = 6500;
const CONSULTATION_EMAIL = 'fortuneallwell066@gmail.com';
const MAILTO_HREF = `mailto:${CONSULTATION_EMAIL}?subject=${encodeURIComponent(
  'Private Real Estate Consultation — Killingsworth Homes'
)}`;

export function FooterConsultation() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const prefersReduced = useReducedMotion();

  const currentQuote = TESTIMONIALS[quoteIdx];

  // Continuous, never-ceasing auto-rotation through client testimonials
  useEffect(() => {
    if (prefersReduced) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setQuoteIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, QUOTE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [prefersReduced, quoteIdx]);

  const handlePrev = () => {
    setDirection(-1);
    setQuoteIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setQuoteIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <footer className="bg-transparent pt-16 pb-12 md:pt-24 md:pb-16">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
        {/* Part 1: Minimal 2-Column Client Words with Continuous Auto-Rotation */}
        <div className="grid grid-cols-1 gap-8 pb-16 md:pb-24 lg:grid-cols-12 lg:items-start">
          <div className="flex h-full flex-col justify-between lg:col-span-4">
            <div>
              <motion.span
                initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: EXPO_EASE }}
                className="inline-block font-mono-index text-[13px] text-[#3B404C]"
              >
                (Client Words)
              </motion.span>
              <h2 className="headline-tight mt-3 text-[clamp(1.6rem,2.4vw,2rem)] font-medium leading-[1.15] text-[#111111]">
                <MaskedInViewReveal>
                  Trusted by buyers &amp; sellers statewide
                </MaskedInViewReveal>
              </h2>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  whileTap={prefersReduced ? undefined : { scale: 0.93 }}
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white/60 text-[#111111] transition-colors hover:border-[#111111] hover:bg-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={prefersReduced ? undefined : { scale: 0.93 }}
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white/60 text-[#111111] transition-colors hover:border-[#111111] hover:bg-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                </motion.button>
                <span className="ml-2 font-mono-index text-[12px] text-[#3B404C] tabular-nums">
                  {String(quoteIdx + 1).padStart(2, '0')} /{' '}
                  {String(TESTIMONIALS.length).padStart(2, '0')}
                </span>
              </div>

              {/* Continuous Live Timer Bar Across Active Quote */}
              <div
                aria-hidden="true"
                className="mt-4 h-[1.5px] w-36 overflow-hidden bg-black/12"
              >
                {prefersReduced ? (
                  <div
                    className="h-full bg-[#111111]"
                    style={{
                      width: `${((quoteIdx + 1) / TESTIMONIALS.length) * 100}%`,
                    }}
                  />
                ) : (
                  <motion.div
                    key={quoteIdx}
                    className="h-full origin-left bg-[#111111]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: QUOTE_INTERVAL_MS / 1000,
                      ease: 'linear',
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex min-h-[180px] flex-col justify-between overflow-hidden lg:col-span-7 lg:col-start-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={currentQuote.id}
                custom={direction}
                initial={
                  prefersReduced
                    ? { opacity: 1 }
                    : { opacity: 0, x: direction * 34 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  prefersReduced
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction * -34 }
                }
                transition={{ duration: 0.5, ease: EXPO_EASE }}
                className="flex flex-col justify-between will-change-transform"
              >
                <p className="text-[clamp(1.25rem,2.1vw,1.65rem)] font-normal leading-[1.42] tracking-[-0.02em] text-[#111111]">
                  &ldquo;{currentQuote.quote}&rdquo;
                </p>
                <footer className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px]">
                  <span className="font-medium text-[#111111]">
                    {currentQuote.author}
                  </span>
                  <span aria-hidden="true" className="text-[#3B404C]">
                    ·
                  </span>
                  <span className="text-[#3B404C]">{currentQuote.context}</span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        <HairlineDivider />

        {/* Part 2: Centered Direct Consultation CTA */}
        <div
          id="contact"
          className="flex flex-col items-center py-20 text-center md:py-28"
        >
          <motion.span
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EXPO_EASE }}
            className="inline-block font-mono-index text-[13px] text-[#3B404C]"
          >
            (Direct Consultation)
          </motion.span>

          <h2 className="headline-tight mt-4 max-w-2xl text-[clamp(2.2rem,4.5vw,3.75rem)] font-medium leading-[1.06] text-[#111111]">
            <MaskedInViewReveal>Thinking of making a move?</MaskedInViewReveal>
          </h2>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, delay: 0.14, ease: EXPO_EASE }}
            className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-[#3B404C]"
          >
            Whether acquiring quietly off-market or preparing a Florida residence
            for launch, reach Shaunda directly for a private conversation.
          </motion.p>

          {/* Big Centered Request Consultation Button Linking to Email */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EXPO_EASE }}
            className="mt-10 flex justify-center"
          >
            <motion.div
              animate={prefersReduced ? undefined : { y: [0, -4, 0] }}
              transition={{
                duration: 4.0,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <MagneticLink
                shimmer
                href={MAILTO_HREF}
                className="group inline-flex min-h-[60px] items-center justify-center rounded-full bg-[#111111] px-10 py-4 text-[16px] font-medium tracking-[-0.01em] text-white shadow-[0_20px_44px_-16px_rgba(17,17,17,0.45)] transition-colors duration-200 hover:bg-[#2A2A2A] md:min-h-[68px] md:px-14 md:py-5 md:text-[18px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-4"
              >
                <span>Request Consultation</span>
                <ArrowUpRight
                  className="h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </MagneticLink>
            </motion.div>
          </motion.div>

          {/* Direct Contact Details */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, delay: 0.26, ease: EXPO_EASE }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-[#3B404C]"
          >
            <a
              href="tel:+19415550184"
              className="font-mono-index text-[#111111] transition-colors hover:text-[#3B404C]"
            >
              (941) 555-0184
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="mailto:shaundakillingsworth@gmail.com?subject=Private%20Real%20Estate%20Consultation%20%E2%80%94%20Killingsworth%20Homes"
              className="text-[#111111] transition-colors hover:text-[#3B404C]"
            >
              shaundakillingsworth@gmail.com
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#111111]"
            >
              Instagram · @killingsworthhomes
            </a>
          </motion.div>
        </div>

        <HairlineDivider />

        {/* Quiet Single-Row Brokerage License & Copyright Line */}
        <div className="mt-8 flex flex-col gap-3 text-[12px] text-[#3B404C] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Killingsworth Homes · Florida
          </span>
          <span>
            Shaunda Killingsworth, Licensed Florida Real Estate Broker Associate ·
            License #BK3491820
          </span>
        </div>
      </div>
    </footer>
  );
}
