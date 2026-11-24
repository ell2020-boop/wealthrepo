import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { PropertyItem } from '../data/siteData';
import { EXPO_EASE } from './MotionPrimitives';

interface PropertyDrawerProps {
  property: PropertyItem | null;
  onClose: () => void;
}

export function PropertyDrawer({ property, onClose }: PropertyDrawerProps) {
  const prefersReduced = useReducedMotion();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setActiveImageIdx(0);
    setSubmitted(false);
    setErrorMsg('');
    setName('');
    setContact('');
    setPreferredDate('');
  }, [property?.id]);

  useEffect(() => {
    if (!property) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setActiveImageIdx((prev) => (prev + 1) % property.images.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIdx(
          (prev) => (prev - 1 + property.images.length) % property.images.length
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [property, onClose]);

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setErrorMsg('Please enter your name and email or phone number.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {property && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-property-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EXPO_EASE }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111111]/45 backdrop-blur-[3px]"
          />

          {/* Slide-Over Panel with Luminous White & Grey Gradient */}
          <motion.aside
            initial={prefersReduced ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReduced ? { opacity: 1 } : { x: '0%' }}
            exit={prefersReduced ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.55, ease: EXPO_EASE }}
            className="relative z-10 flex h-full w-full max-w-[640px] flex-col overflow-y-auto border-l border-black/12 bg-gradient-to-b from-white via-[#F4F5F8] to-[#E6E8EE] text-[#111111]"
          >
            {/* Sticky Drawer Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-black/10 bg-white/90 px-6 py-4 backdrop-blur-md md:px-8">
              <div className="flex items-center gap-3 text-[13px] text-[#52525B]">
                <span className="font-mono-index text-[#111111]">
                  {property.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{property.status}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close property details"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-[#111111] transition-colors hover:bg-[#E4E7ED] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 px-6 py-8 md:px-8">
              {/* Mini Photo Gallery */}
              <div className="relative overflow-hidden rounded-[2px] bg-[#E5E7EB]">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={property.images[activeImageIdx]}
                      src={property.images[activeImageIdx]}
                      alt={`${property.title} view ${activeImageIdx + 1}`}
                      referrerPolicy="no-referrer"
                      initial={
                        prefersReduced
                          ? { opacity: 1 }
                          : {
                              opacity: 0,
                              scale: 1.04,
                              clipPath: 'inset(0% 0% 0% 8%)',
                            }
                      }
                      animate={{
                        opacity: 1,
                        scale: 1,
                        clipPath: 'inset(0% 0% 0% 0%)',
                      }}
                      exit={
                        prefersReduced
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.98 }
                      }
                      transition={{ duration: 0.48, ease: EXPO_EASE }}
                      className="h-full w-full object-cover will-change-transform"
                    />
                  </AnimatePresence>
                </div>

                {property.images.length > 1 && (
                  <div className="mt-3 flex items-center justify-between px-1 pb-1">
                    <div className="flex items-center gap-2">
                      {property.images.map((imgUrl, idx) => (
                        <button
                          key={imgUrl}
                          type="button"
                          onClick={() => setActiveImageIdx(idx)}
                          aria-label={`View photo ${idx + 1}`}
                          className={`relative h-14 w-20 overflow-hidden rounded-[2px] border transition-opacity cursor-pointer ${
                            idx === activeImageIdx
                              ? 'border-[#111111] opacity-100'
                              : 'border-black/15 opacity-55 hover:opacity-90'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`${property.title} thumbnail ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Previous photo"
                        onClick={() =>
                          setActiveImageIdx(
                            (prev) =>
                              (prev - 1 + property.images.length) %
                              property.images.length
                          )
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white/75 text-[#111111] transition-colors hover:bg-white cursor-pointer"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next photo"
                        onClick={() =>
                          setActiveImageIdx(
                            (prev) => (prev + 1) % property.images.length
                          )
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white/75 text-[#111111] transition-colors hover:bg-white cursor-pointer"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Property Header & Specs */}
              <div className="mt-8 border-b border-black/10 pb-6">
                <p className="text-[13px] text-[#52525B]">
                  {property.neighborhood} · {property.city}
                </p>
                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-4">
                  <h2
                    id="drawer-property-title"
                    className="headline-tight text-2xl font-medium text-[#111111] md:text-3xl"
                  >
                    {property.title}
                  </h2>
                  <span className="font-mono-index text-xl font-medium tabular-nums text-[#111111]">
                    {property.price}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-[#52525B] tabular-nums">
                  <span>{property.beds} Beds</span>
                  <span aria-hidden="true">·</span>
                  <span>{property.baths} Baths</span>
                  <span aria-hidden="true">·</span>
                  <span>{property.sqft}</span>
                  <span aria-hidden="true">·</span>
                  <span>Built {property.yearBuilt}</span>
                </div>
                <p className="mt-2 text-[13px] text-[#52525B]">
                  {property.lotSummary}
                </p>
              </div>

              {/* Architectural Notes */}
              <div className="mt-6 border-b border-black/10 pb-6">
                <p className="text-[15px] leading-[1.65] text-[#111111]">
                  {property.architecturalNote}
                </p>
                <ul className="mt-4 space-y-2 text-[14px] text-[#52525B]">
                  {property.highlights.map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={prefersReduced ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.15 + idx * 0.06,
                        ease: EXPO_EASE,
                      }}
                      className="flex items-start gap-2.5"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#111111]" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Quick Tour Request */}
              <div className="mt-6 rounded-[2px] border border-black/10 bg-white/75 p-6 backdrop-blur-sm">
                <h3 className="text-[16px] font-medium text-[#111111]">
                  {property.status === 'For Sale'
                    ? 'Request a Private Tour'
                    : 'Inquire About Similar Off-Market Homes'}
                </h3>
                <p className="mt-1 text-[13px] text-[#52525B]">
                  Direct response from Shaunda Killingsworth within 2 hours.
                </p>

                {submitted ? (
                  <div className="mt-5 flex items-start gap-3 border border-black/10 bg-white p-4">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#111111]" />
                    <div className="text-[14px]">
                      <p className="font-medium text-[#111111]">
                        Tour inquiry received for {property.title}
                      </p>
                      <p className="mt-1 text-[#52525B]">
                        Shaunda will reach out directly at {contact} to confirm
                        access details.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleTourSubmit} className="mt-5 space-y-4">
                    <div>
                      <label htmlFor="drawer-name" className="sr-only">
                        Your Name
                      </label>
                      <input
                        id="drawer-name"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border-b border-black/18 bg-transparent py-2.5 text-[14px] text-[#111111] placeholder:text-[#52525B] focus:border-[#111111] focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="drawer-contact" className="sr-only">
                          Email or Phone
                        </label>
                        <input
                          id="drawer-contact"
                          type="text"
                          placeholder="Email or Phone"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="w-full border-b border-black/18 bg-transparent py-2.5 text-[14px] text-[#111111] placeholder:text-[#52525B] focus:border-[#111111] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="drawer-date" className="sr-only">
                          Preferred Date
                        </label>
                        <input
                          id="drawer-date"
                          type="text"
                          placeholder="Preferred Day (e.g. Thu Afternoon)"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full border-b border-black/18 bg-transparent py-2.5 text-[14px] text-[#111111] placeholder:text-[#52525B] focus:border-[#111111] focus:outline-none"
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="text-[13px] text-[#111111]" role="alert">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#111111] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#2A2A2A] cursor-pointer"
                    >
                      {property.status === 'For Sale'
                        ? 'Schedule Private Walkthrough'
                        : 'Request Off-Market Comps'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
