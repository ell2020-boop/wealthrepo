import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AGENT_PORTRAIT, TRACK_RECORD_STATS } from '../data/siteData';
import {
  HairlineDivider,
  ParallaxImage,
  CurtainReveal,
  MaskedInViewReveal,
  RollingCounter,
  ShimmerSweep,
  EXPO_EASE,
} from './MotionPrimitives';

interface AboutSectionProps {
  onBookCall: () => void;
}

export function AboutSection({ onBookCall }: AboutSectionProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
        <HairlineDivider className="mb-12 md:mb-16" />

        {/* Asymmetric 2-Column Split */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          {/* Left: High-Contrast Editorial Portrait with Curtain Reveal, Continuous Motion & Sheen */}
          <div className="lg:col-span-5">
            <div className="group flex h-full flex-col">
              <div className="relative aspect-[4/4.4] w-full flex-1 overflow-hidden rounded-[2px] shadow-[0_16px_42px_-18px_rgba(17,17,17,0.2)]">
                <CurtainReveal onScroll className="h-full w-full">
                  <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
                    <ParallaxImage
                      src={AGENT_PORTRAIT}
                      alt="Shaunda Killingsworth on the Florida waterfront"
                      className="h-full w-full rounded-[2px]"
                      imgClassName="object-cover object-top contrast-[1.03]"
                      offsetPercent={3.5}
                      continuousDrift
                      driftDelay={0.5}
                    />
                  </div>
                </CurtainReveal>
                <ShimmerSweep delay={0.8} duration={3.0} repeatDelay={4.5} />
              </div>

              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.25, ease: EXPO_EASE }}
                className="mt-3 flex items-center justify-between text-[12px] text-[#52525B]"
              >
                <span>Shaunda Killingsworth</span>
                <span className="font-mono-index">Principal Advisor · Florida</span>
              </motion.div>
            </div>
          </div>

          {/* Right: Concise Authentic Bio */}
          <div className="flex flex-col justify-between py-1 lg:col-span-6 lg:col-start-7">
            <div>
              <motion.span
                initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: EXPO_EASE }}
                className="inline-block font-mono-index text-[13px] text-[#52525B]"
              >
                (01) Principal-Led Advisory
              </motion.span>
              <h2 className="headline-tight mt-4 text-[clamp(1.85rem,3.2vw,2.75rem)] font-medium leading-[1.1] text-[#111111]">
                <MaskedInViewReveal delay={0.05}>
                  One point of contact, from first
                </MaskedInViewReveal>
                <MaskedInViewReveal delay={0.13}>
                  walkthrough to closing table.
                </MaskedInViewReveal>
              </h2>

              <div className="mt-6 space-y-4 text-[16px] leading-[1.65] text-[#52525B]">
                <motion.p
                  initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.75, delay: 0.16, ease: EXPO_EASE }}
                >
                  Most brokerages win your listing with a senior partner, then
                  quietly hand day-to-day showings, negotiations, and inspection
                  deadlines to a junior team. At Killingsworth Homes, I work
                  with a deliberate limit of four active clients at a time so you
                  never get passed down the chain.
                </motion.p>
                <motion.p
                  initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.75, delay: 0.24, ease: EXPO_EASE }}
                >
                  Operating across Florida&apos;s Gulf Coast and Winter Park, I
                  pair architectural fluency with strict underwriting—evaluating
                  seawall life, flood elevation, wind-mitigation credits, and
                  street-level comps before you ever draft an offer or set a
                  list price.
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EXPO_EASE }}
              className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/12 pt-6"
            >
              <p className="text-[14px] font-medium text-[#111111]">
                Direct line for private buyers &amp; sellers
              </p>
              <button
                type="button"
                onClick={onBookCall}
                className="group relative inline-flex min-h-[44px] items-center text-[14px] font-medium text-[#111111] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-4"
              >
                <span>Schedule a 15-minute intro call</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 left-0 right-0 h-px bg-[#111111] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-75"
                />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Hairline-Divided 3-Stat Bar with Continuous Wave Levitation & Odometer Numbers */}
        <div className="mt-16 md:mt-20">
          <HairlineDivider />
          <div className="grid grid-cols-1 divide-y divide-black/12 md:grid-cols-3 md:divide-x md:divide-y-0">
            {TRACK_RECORD_STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={prefersReduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.75, delay: idx * 0.1, ease: EXPO_EASE }}
                className={`py-8 md:py-10 ${
                  idx === 0
                    ? 'md:pr-8'
                    : idx === 1
                    ? 'md:px-8'
                    : 'md:pl-8'
                }`}
              >
                <motion.div
                  animate={
                    prefersReduced
                      ? undefined
                      : { y: [0, -5, 0] }
                  }
                  transition={{
                    duration: 4.5,
                    delay: idx * 0.7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="will-change-transform"
                >
                  <div className="text-[clamp(2.25rem,3.6vw,3.25rem)] font-medium tracking-[-0.03em] text-[#111111]">
                    <RollingCounter
                      prefix={stat.prefix}
                      value={stat.value}
                      suffix={stat.suffix}
                      delayOffset={idx * 0.12}
                    />
                  </div>
                  <p className="mt-2 text-[14px] text-[#52525B]">{stat.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <HairlineDivider delay={0.15} />
        </div>
      </div>
    </section>
  );
}
