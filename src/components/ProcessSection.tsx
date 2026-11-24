import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { BUYING_STEPS, SELLING_STEPS } from '../data/siteData';
import {
  HairlineDivider,
  MaskedInViewReveal,
  ShimmerSweep,
  EXPO_EASE,
} from './MotionPrimitives';

type ProcessMode = 'buying' | 'selling';

export function ProcessSection() {
  const [mode, setMode] = useState<ProcessMode>('buying');
  const prefersReduced = useReducedMotion();

  const steps = mode === 'buying' ? BUYING_STEPS : SELLING_STEPS;

  return (
    <section
      id="process"
      className="relative overflow-hidden border-y border-black/12 bg-gradient-to-b from-white/35 via-[#C4CDD9]/60 to-white/35 py-16 backdrop-blur-[3px] md:py-24"
    >
      {/* Subtle Continuous Ambient Sheen Across the Process Band */}
      <ShimmerSweep delay={0.5} duration={4.5} repeatDelay={5.5} />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EXPO_EASE }}
              className="inline-block font-mono-index text-[13px] text-[#3B404C]"
            >
              (Process)
            </motion.span>
            <h2 className="headline-tight mt-3 text-[clamp(1.75rem,3vw,2.6rem)] font-medium leading-[1.1] text-[#111111]">
              <MaskedInViewReveal>How we work together</MaskedInViewReveal>
            </h2>
          </div>

          {/* Interactive Buying / Selling Switch */}
          <div
            role="tablist"
            aria-label="Representation workflow"
            className="inline-flex items-center gap-8 border-b border-black/12"
          >
            {(
              [
                { id: 'buying', label: 'Buying with me' },
                { id: 'selling', label: 'Selling with me' },
              ] as const
            ).map((tab) => {
              const isSelected = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setMode(tab.id)}
                  className={`relative pb-3 text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                    isSelected
                      ? 'text-[#111111]'
                      : 'text-[#3B404C] hover:text-[#111111]'
                  }`}
                >
                  {tab.label}
                  {isSelected && (
                    <motion.span
                      layoutId="process-tab-underline"
                      transition={
                        prefersReduced
                          ? { duration: 0 }
                          : { duration: 0.45, ease: EXPO_EASE }
                      }
                      className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#111111]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <HairlineDivider className="mt-10 mb-10 md:mt-12 md:mb-12" />

        {/* 3 Crisp Numbered Steps with Continuous Sequential Travelling Highlight & Wave Levitation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.25, ease: EXPO_EASE }}
            className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
          >
            {steps.map((step, idx) => (
              <motion.div
                key={step.index}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, y: -12 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.09,
                  ease: EXPO_EASE,
                }}
                className="group relative flex flex-col pt-6"
              >
                {/* Continuous Travelling Light Accent Along Step Divider */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-px overflow-hidden bg-black/15"
                >
                  {!prefersReduced && (
                    <motion.span
                      animate={{ x: ['-40%', '220%'] }}
                      transition={{
                        duration: 2.8,
                        delay: idx * 0.9,
                        repeat: Infinity,
                        repeatDelay: 2.0,
                        ease: 'easeInOut',
                      }}
                      className="block h-full w-1/3 bg-gradient-to-r from-transparent via-[#111111] to-transparent will-change-transform"
                    />
                  )}
                </div>

                <motion.div
                  animate={
                    prefersReduced
                      ? undefined
                      : { y: [0, -4, 0] }
                  }
                  transition={{
                    duration: 4.8,
                    delay: idx * 0.75,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="will-change-transform"
                >
                  <span className="inline-block font-mono-index text-[13px] text-[#3B404C] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-[#111111]">
                    {step.index}
                  </span>
                  <h3 className="mt-4 text-[19px] font-medium tracking-[-0.02em] text-[#111111]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-[#3B404C]">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
