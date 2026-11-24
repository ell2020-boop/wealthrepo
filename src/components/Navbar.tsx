import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import {
  MagneticButton,
  ScrollProgressBar,
  EXPO_EASE,
} from './MotionPrimitives';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onBookCall: () => void;
}

const NAV_LINKS = [
  { label: 'Listings', id: 'listings' },
  { label: 'About', id: 'about' },
  { label: 'Process', id: 'process' },
];

export function Navbar({ onNavigate, onBookCall }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <motion.header
      initial={prefersReduced ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EXPO_EASE }}
      className="sticky top-0 z-40 w-full border-b border-black/10 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-8 px-5 md:px-8 lg:px-10">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('top');
          }}
          className="whitespace-nowrap shrink-0 text-[15px] font-semibold tracking-[-0.02em] text-[#111111] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-4"
        >
          Killingsworth Homes
        </a>

        {/* Zone 2: 3 Concise Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
              className="group relative whitespace-nowrap shrink-0 py-1 text-[14px] font-medium text-[#52525B] transition-colors duration-200 hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-4"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#111111] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Magnetic Pill CTA with Continuous Luxury Shimmer + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <MagneticButton
            shimmer
            onClick={() => {
              setMobileOpen(false);
              onBookCall();
            }}
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap shrink-0 rounded-full bg-[#111111] px-5 py-2.5 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-[#2A2A2A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 cursor-pointer"
          >
            Book a Call
          </MagneticButton>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center text-[#111111] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Razor-thin Architectural Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EXPO_EASE }}
            className="border-t border-black/10 bg-white/95 backdrop-blur-md px-5 py-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={prefersReduced ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05, ease: EXPO_EASE }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                  className="py-1 text-base font-medium text-[#111111]"
                >
                  {link.label}
                </motion.a>
              ))}
              <MagneticButton
                shimmer
                onClick={() => {
                  setMobileOpen(false);
                  onBookCall();
                }}
                className="mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#111111] px-5 py-2.5 text-sm font-medium text-white"
              >
                Book a Call
              </MagneticButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
