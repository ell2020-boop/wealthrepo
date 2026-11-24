import React, { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import {
  ACTIVE_LISTINGS,
  SOLD_LISTINGS,
  PropertyItem,
} from '../data/siteData';
import {
  ParallaxImage,
  CurtainReveal,
  MaskedInViewReveal,
  MarqueeRibbon,
  ShimmerSweep,
  HairlineDivider,
  EXPO_EASE,
} from './MotionPrimitives';

interface PortfolioSectionProps {
  onSelectProperty: (property: PropertyItem) => void;
}

type PortfolioTab = 'active' | 'sold';

const MARKET_RIBBON_ITEMS = [
  'Sarasota Bay',
  'Bird Key',
  'Olde Winter Park',
  'Aqualane Shores',
  'Longboat Key',
  'Anna Maria Island',
  'North Coconut Grove',
  'Siesta Key',
];

function PropertyCard({
  property,
  index,
  onSelect,
}: {
  property: PropertyItem;
  index: number;
  onSelect: (p: PropertyItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 320, damping: 28, mass: 0.35 });
  const springY = useSpring(cursorY, { stiffness: 320, damping: 28, mass: 0.35 });

  // Subtle column scroll offset on desktop so left & right columns glide past each other
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start end', 'end start'],
  });
  const columnDrift = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 1 ? [16, -16] : [0, 0]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      ref={outerRef}
      layout="position"
      style={prefersReduced ? undefined : { y: columnDrift }}
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{
        duration: 0.75,
        delay: (index % 2) * 0.08,
        ease: EXPO_EASE,
      }}
      className="group will-change-transform"
    >
      <button
        type="button"
        onClick={() => onSelect(property)}
        className="block w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-4"
      >
        {/* Image Frame with Explicit Aspect Ratio, Continuous Ken Burns Drift, Glass Shimmer Sweep & Cursor/Touch Badge */}
        <div
          ref={cardRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#E5E7EB] shadow-[0_14px_38px_-18px_rgba(17,17,17,0.18)]"
        >
          <CurtainReveal delay={(index % 2) * 0.08} className="absolute inset-0">
            <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
              <ParallaxImage
                src={property.images[0]}
                alt={`${property.title} in ${property.neighborhood}`}
                className="h-full w-full"
                offsetPercent={3.5}
                continuousDrift
                driftDelay={index * 1.4}
              />
            </div>
          </CurtainReveal>

          {/* Continuous Subtle Architectural Light Sheen */}
          <ShimmerSweep
            delay={index * 1.3}
            duration={2.8}
            repeatDelay={4.2}
          />

          {/* Always-Visible Breathing Badge on Touch/Mobile Screens (< md) */}
          <motion.div
            aria-hidden="true"
            animate={
              prefersReduced
                ? undefined
                : { y: [0, -3, 0] }
            }
            transition={{
              duration: 3.2,
              delay: index * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute right-3 bottom-3 z-10 inline-flex md:hidden items-center gap-1.5 rounded-full bg-[#111111]/90 px-3.5 py-1.5 text-[11px] font-medium tracking-tight text-white shadow-md backdrop-blur-sm"
          >
            <span>View Home</span>
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
          </motion.div>

          {/* Floating Cursor Pill Badge (Desktop Hover) */}
          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              style={{
                left: springX,
                top: springY,
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.78,
              }}
              transition={{ duration: 0.22, ease: EXPO_EASE }}
              className="pointer-events-none absolute z-10 hidden md:inline-flex items-center gap-1.5 rounded-full bg-[#111111] px-4 py-2 text-[12px] font-medium tracking-tight text-white shadow-lg"
            >
              <span>View Home</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </motion.div>
          )}
        </div>

        {/* Clean Unboxed Typographic Metadata with Travelling Glint Hairline */}
        <div className="relative mt-4 pt-3.5">
          <HairlineDivider delay={index * 0.15} />
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-[#111111] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          />

          <div className="flex items-center justify-between gap-4 text-[13px] text-[#3B404C]">
            <span>
              <span className="font-mono-index mr-2 text-[#111111]">
                {property.index}
              </span>
              {property.neighborhood} · {property.city}
            </span>
            <span className="font-mono-index whitespace-nowrap shrink-0 text-[#111111]">
              {property.status}
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between gap-4">
            <h3 className="text-[20px] font-medium tracking-[-0.02em] text-[#111111] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
              {property.title}
            </h3>
            <span className="font-mono-index text-[17px] font-medium tabular-nums text-[#111111] whitespace-nowrap shrink-0">
              {property.price}
            </span>
          </div>

          <p className="mt-1.5 text-[14px] text-[#3B404C] tabular-nums">
            {property.beds} Beds · {property.baths} Baths · {property.sqft}
          </p>
        </div>
      </button>
    </motion.article>
  );
}

export function PortfolioSection({ onSelectProperty }: PortfolioSectionProps) {
  const [activeTab, setActiveTab] = useState<PortfolioTab>('active');
  const prefersReduced = useReducedMotion();

  const items = activeTab === 'active' ? ACTIVE_LISTINGS : SOLD_LISTINGS;

  return (
    <section id="listings" className="pb-16 md:pb-24">
      {/* Continuous Kinetic Florida Markets Ribbon */}
      <MarqueeRibbon items={MARKET_RIBBON_ITEMS} speedSeconds={24} />
      <MarqueeRibbon
        items={[...MARKET_RIBBON_ITEMS].reverse()}
        reverse
        speedSeconds={30}
        className="mb-14 border-t-0 bg-white/30 md:mb-20"
      />

      <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
        {/* Section Header + Sliding Tab Switch */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EXPO_EASE }}
              className="inline-block font-mono-index text-[13px] text-[#3B404C]"
            >
              (Curated)
            </motion.span>
            <h2 className="headline-tight mt-3 text-[clamp(1.75rem,3vw,2.6rem)] font-medium leading-[1.1] text-[#111111]">
              <MaskedInViewReveal>
                Selected residences across Florida
              </MaskedInViewReveal>
            </h2>
          </div>

          {/* Interactive Tabs with Animated Sliding Underline */}
          <div
            role="tablist"
            aria-label="Property portfolio filter"
            className="flex items-center gap-8 border-b border-black/12"
          >
            {(
              [
                { id: 'active', label: `Active Listings (${ACTIVE_LISTINGS.length})` },
                { id: 'sold', label: `Recently Sold (${SOLD_LISTINGS.length})` },
              ] as const
            ).map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-3 text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                    isSelected
                      ? 'text-[#111111]'
                      : 'text-[#3B404C] hover:text-[#111111]'
                  }`}
                >
                  {tab.label}
                  {isSelected && (
                    <motion.span
                      layoutId="portfolio-tab-underline"
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

        {/* 2-Column Editorial Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: EXPO_EASE }}
            className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2"
          >
            {items.map((property, idx) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={idx}
                onSelect={onSelectProperty}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
