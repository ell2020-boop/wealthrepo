import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { TESTIMONIALS } from '../data/siteData';
import {
  HairlineDivider,
  MaskedInViewReveal,
  MagneticButton,
  EXPO_EASE,
} from './MotionPrimitives';

interface FooterConsultationProps {
  nameInputRef: React.RefObject<HTMLInputElement | null>;
}

export function FooterConsultation({ nameInputRef }: FooterConsultationProps) {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [intent, setIntent] = useState<'Buying' | 'Selling'>('Buying');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const prefersReduced = useReducedMotion();

  const currentQuote = TESTIMONIALS[quoteIdx];

  const handlePrev = () => {
    setDirection(-1);
    setQuoteIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setQuoteIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();

    if (!trimmedName || !trimmedContact) {
      setErrorMsg('Please provide your name and an email or phone number.');
      return;
    }

    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
    const looksLikePhone = trimmedContact.replace(/\D/g, '').length >= 7;

    if (!looksLikeEmail && !looksLikePhone) {
      setErrorMsg('Please enter a valid email address or phone number.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <footer className="bg-transparent pt-16 pb-12 md:pt-24 md:pb-16">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
        {/* Part 1: Minimal 2-Column Client Words with Directional Slide */}
        <div className="grid grid-cols-1 gap-8 pb-16 md:pb-24 lg:grid-cols-12 lg:items-start">
          <div className="flex h-full flex-col justify-between lg:col-span-4">
            <div>
              <motion.span
                initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: EXPO_EASE }}
                className="inline-block font-mono-index text-[13px] text-[#52525B]"
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
                <span className="ml-2 font-mono-index text-[12px] text-[#52525B] tabular-nums">
                  {String(quoteIdx + 1).padStart(2, '0')} /{' '}
                  {String(TESTIMONIALS.length).padStart(2, '0')}
                </span>
              </div>

              {/* Animated Testimonial Position Indicator */}
              <div
                aria-hidden="true"
                className="mt-4 h-[1.5px] w-32 overflow-hidden bg-black/12"
              >
                <motion.div
                  className="h-full origin-left bg-[#111111]"
                  animate={{ scaleX: (quoteIdx + 1) / TESTIMONIALS.length }}
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : { duration: 0.45, ease: EXPO_EASE }
                  }
                />
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
                transition={{ duration: 0.45, ease: EXPO_EASE }}
                className="flex flex-col justify-between will-change-transform"
              >
                <p className="text-[clamp(1.25rem,2.1vw,1.65rem)] font-normal leading-[1.42] tracking-[-0.02em] text-[#111111]">
                  &ldquo;{currentQuote.quote}&rdquo;
                </p>
                <footer className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px]">
                  <span className="font-medium text-[#111111]">
                    {currentQuote.author}
                  </span>
                  <span aria-hidden="true" className="text-[#52525B]">
                    ·
                  </span>
                  <span className="text-[#52525B]">{currentQuote.context}</span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        <HairlineDivider />

        {/* Part 2: Direct Consultation CTA & Minimal Bottom-Border Form */}
        <div
          id="contact"
          className="grid grid-cols-1 gap-12 py-16 md:py-20 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <motion.span
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EXPO_EASE }}
              className="inline-block font-mono-index text-[13px] text-[#52525B]"
            >
              (Direct Consultation)
            </motion.span>
            <h2 className="headline-tight mt-3 text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.08] text-[#111111]">
              <MaskedInViewReveal>Thinking of making a move?</MaskedInViewReveal>
            </h2>
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, delay: 0.14, ease: EXPO_EASE }}
              className="mt-4 max-w-[38ch] text-[15px] leading-[1.6] text-[#52525B]"
            >
              Share what you&apos;re considering—whether buying quietly off-market
              or preparing a residence for launch.
            </motion.p>

            {/* Direct Contact Details */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, delay: 0.22, ease: EXPO_EASE }}
              className="mt-8 space-y-2.5 text-[14px] text-[#111111]"
            >
              <div>
                <a
                  href="tel:+19415550184"
                  className="font-mono-index transition-colors hover:text-[#52525B]"
                >
                  (941) 555-0184
                </a>
              </div>
              <div>
                <a
                  href="mailto:shaunda@killingsworthhomes.com"
                  className="transition-colors hover:text-[#52525B]"
                >
                  shaunda@killingsworthhomes.com
                </a>
              </div>
              <div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#52525B] transition-colors hover:text-[#111111]"
                >
                  Instagram · @killingsworthhomes
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EXPO_EASE }}
            className="lg:col-span-6 lg:col-start-7"
          >
            {submitted ? (
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EXPO_EASE }}
                className="rounded-[2px] border border-black/12 bg-white/75 p-8 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={prefersReduced ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: EXPO_EASE }}
                  >
                    <Check className="mt-1 h-5 w-5 shrink-0 text-[#111111]" />
                  </motion.div>
                  <div>
                    <h3 className="text-[18px] font-medium text-[#111111]">
                      Consultation request received
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-[#52525B]">
                      Thank you, {name}. Shaunda will follow up directly at{' '}
                      <span className="text-[#111111]">{contact}</span> regarding{' '}
                      {intent.toLowerCase()} in Florida.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setContact('');
                      }}
                      className="mt-5 text-[13px] font-medium text-[#111111] underline underline-offset-4 cursor-pointer"
                    >
                      Send another note
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8" noValidate>
                <div className="relative">
                  <label
                    htmlFor="consult-name"
                    className="block text-[12px] font-medium text-[#52525B]"
                  >
                    Name
                  </label>
                  <input
                    ref={nameInputRef}
                    id="consult-name"
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full border-b border-black/18 bg-transparent py-3 text-[16px] text-[#111111] placeholder:text-[#52525B]/60 focus:outline-none"
                  />
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: EXPO_EASE }}
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1.5px] origin-left bg-[#111111]"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="consult-contact"
                    className="block text-[12px] font-medium text-[#52525B]"
                  >
                    Email or Phone
                  </label>
                  <input
                    id="consult-contact"
                    type="text"
                    placeholder="you@domain.com or (941) 000-0000"
                    value={contact}
                    onFocus={() => setFocusedField('contact')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setContact(e.target.value)}
                    className="mt-1 w-full border-b border-black/18 bg-transparent py-3 text-[16px] text-[#111111] placeholder:text-[#52525B]/60 focus:outline-none"
                  />
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{ scaleX: focusedField === 'contact' ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: EXPO_EASE }}
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1.5px] origin-left bg-[#111111]"
                  />
                </div>

                <div>
                  <span className="block text-[12px] font-medium text-[#52525B]">
                    Buying or Selling?
                  </span>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/50 p-1">
                    {(['Buying', 'Selling'] as const).map((option) => {
                      const active = intent === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setIntent(option)}
                          className={`relative min-h-[38px] rounded-full px-5 py-1.5 text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                            active
                              ? 'text-white'
                              : 'text-[#52525B] hover:text-[#111111]'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="consult-intent-pill"
                              transition={
                                prefersReduced
                                  ? { duration: 0 }
                                  : { duration: 0.4, ease: EXPO_EASE }
                              }
                              className="absolute inset-0 rounded-full bg-[#111111]"
                            />
                          )}
                          <span className="relative z-10">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-[13px] text-[#111111]" role="alert">
                    {errorMsg}
                  </p>
                )}

                <div className="pt-2">
                  <MagneticButton
                    type="submit"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#111111] px-8 py-3 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#2A2A2A] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                  >
                    Request Consultation
                  </MagneticButton>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        <HairlineDivider />

        {/* Quiet Single-Row Brokerage License & Copyright Line */}
        <div className="mt-8 flex flex-col gap-3 text-[12px] text-[#52525B] sm:flex-row sm:items-center sm:justify-between">
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
