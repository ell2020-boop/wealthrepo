import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/siteData';
import {
  MaskedLineReveal,
  CurtainReveal,
  ParallaxImage,
  MagneticButton,
  HairlineDivider,
  ShimmerSweep,
  EXPO_EASE,
} from './MotionPrimitives';

interface HeroProps {
  onExploreListings: () => void;
  onScheduleTour: () => void;
}

export function Hero({ onExploreListings, onScheduleTour }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
  });

  const foregroundY = useTransform(smoothScroll, [0, 1], ['0%', '16%']);
  const foregroundOpacity = useTransform(smoothScroll, [0, 0.72], [1, 0]);
  const bgScale = useTransform(smoothScroll, [0, 1], [1, 1.08]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative flex min-h-[calc(100svh-4rem)] w-full flex-col justify-between overflow-hidden bg-[#18191D]"
    >
      {/* Full-Bleed Architectural Residence Background with Continuous Cinema Pan & Zoom */}
      <motion.div
        style={prefersReduced ? undefined : { scale: bgScale }}
        className="absolute inset-0 z-0 origin-center will-change-transform"
      >
        <motion.div
          animate={
            prefersReduced
              ? undefined
              : {
                  scale: [1, 1.07, 1],
                  x: ['-1%', '1%', '-1%'],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="h-full w-full will-change-transform"
        >
          <CurtainReveal delay={0.05} className="h-full w-full">
            <ParallaxImage
              src={HERO_IMAGE}
              alt="Contemporary board-formed concrete and travertine Florida coastal residence overlooking the Gulf"
              className="h-full w-full"
              offsetPercent={5}
              priority
            />
          </CurtainReveal>
        </motion.div>

        {/* Subtle Continuous Sunlight Glass Glint Across Hero Frame */}
        <ShimmerSweep delay={1.2} duration={3.4} repeatDelay={4.5} />

        {/* Measured Contrast Scrims for Legibility Across All Luminance Zones */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/45"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/25"
        />
      </motion.div>

      {/* Top Editorial Bar over Hero Background with Travelling Glint Hairline */}
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 pt-8 md:px-8 md:pt-12 lg:px-10">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.16, ease: EXPO_EASE }}
          className="flex flex-wrap items-center justify-between gap-4 pb-4 text-[13px] text-white/85"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono-index text-white">(Featured)</span>
            <span aria-hidden="true">·</span>
            <span>Florida Residential &amp; Waterfront Advisory</span>
          </div>

          <div className="flex items-center gap-3 font-mono-index text-[12px] text-white/80 tabular-nums">
            <span>604 Lighthouse Point, Longboat Key</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">$7,900,000</span>
          </div>
        </motion.div>

        <HairlineDivider dark delay={0.2} />
      </div>

      {/* Bottom 12-Column Editorial Headline & Action Anchor */}
      <motion.div
        style={
          prefersReduced
            ? undefined
            : { y: foregroundY, opacity: foregroundOpacity }
        }
        className="relative z-10 mx-auto w-full max-w-[1320px] px-5 pt-20 pb-10 md:px-8 md:pt-32 md:pb-14 lg:px-10 will-change-transform"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="headline-tight text-[clamp(2.3rem,4.9vw,4.35rem)] font-medium leading-[1.04] text-white">
              <MaskedLineReveal delay={0.1}>
                Finding architectural homes
              </MaskedLineReveal>
              <MaskedLineReveal delay={0.18}>
                &amp; smart investments in Florida.
              </MaskedLineReveal>
            </h1>
          </div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: EXPO_EASE }}
            className="lg:col-span-4 lg:pb-1"
          >
            <p className="max-w-[38ch] text-[15px] leading-[1.6] text-white/85">
              Direct, principal-led representation by Shaunda Killingsworth for
              buyers and sellers across Sarasota, Winter Park, and Naples.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <MagneticButton
                shimmer
                onClick={onExploreListings}
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[14px] font-medium text-[#111111] transition-colors duration-200 hover:bg-[#ECEEF2] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
              >
                <span>Explore Listings</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </MagneticButton>

              <button
                type="button"
                onClick={onScheduleTour}
                className="group relative inline-flex min-h-[44px] items-center px-1 py-2.5 text-[14px] font-medium text-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
              >
                <span>Schedule a Tour</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 left-1 right-1 h-px bg-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-75"
                />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Continuous Kinetic Scroll Cue Visible Across All Devices */}
        {!prefersReduced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EXPO_EASE }}
            aria-hidden="true"
            className="mt-8 md:mt-10 flex items-center gap-3 text-[11px] font-mono-index text-white/75"
          >
            <span className="relative h-6 w-px overflow-hidden bg-white/30">
              <motion.span
                animate={{ y: ['-100%', '100%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block h-1/2 w-full bg-white"
              />
            </span>
            <motion.span
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{
                repeat: Infinity,
                duration: 2.6,
                ease: 'easeInOut',
              }}
            >
              Scroll to explore
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
