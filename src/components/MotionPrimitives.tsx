import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'motion/react';
import { Building2 } from 'lucide-react';

export const EXPO_EASE = [0.16, 1, 0.3, 1] as const;

export function AmbientGradientBackdrop() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(135deg,#F8FAFD_0%,#D4DCE7_24%,#B8C2D2_48%,#EEF2F8_70%,#C3CDDB_100%)]"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[linear-gradient(135deg,#F8FAFD_0%,#D4DCE7_22%,#B8C2D2_45%,#EEF2F8_66%,#C2CBD9_86%,#F3F6FA_100%)]"
    >
      {/* Top-Left Specular Silver Highlight Bloom */}
      <motion.div
        animate={{
          x: ['-12%', '16%', '-12%'],
          y: ['-8%', '12%', '-8%'],
          scale: [1, 1.18, 1],
          rotate: [0, 14, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-36 -left-32 h-[540px] w-[540px] md:h-[780px] md:w-[780px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92)_0%,rgba(226,232,242,0.52)_42%,rgba(255,255,255,0)_72%)] will-change-transform"
      />

      {/* Mid-Right Brushed Chrome Depth Wave */}
      <motion.div
        animate={{
          x: ['10%', '-15%', '10%'],
          y: ['8%', '-12%', '8%'],
          scale: [1.1, 0.94, 1.1],
          rotate: [0, -14, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[26%] -right-36 h-[560px] w-[560px] md:h-[840px] md:w-[840px] rounded-full bg-[radial-gradient(circle,rgba(148,160,180,0.68)_0%,rgba(190,200,216,0.34)_48%,rgba(255,255,255,0)_74%)] will-change-transform"
      />

      {/* Bottom-Center Luminous Platinum Sheen */}
      <motion.div
        animate={{
          x: ['-12%', '14%', '-12%'],
          y: ['6%', '-10%', '6%'],
          scale: [0.96, 1.15, 0.96],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-40 left-[12%] h-[520px] w-[520px] md:h-[760px] md:w-[760px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.82)_0%,rgba(198,207,222,0.38)_46%,rgba(255,255,255,0)_72%)] will-change-transform"
      />
    </div>
  );
}

export function ScrollProgressBar() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReduced) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none absolute bottom-[-1px] left-0 right-0 h-[2px] origin-left bg-[#111111]"
    />
  );
}

interface ShimmerSweepProps {
  delay?: number;
  duration?: number;
  repeatDelay?: number;
  light?: boolean;
}

export function ShimmerSweep({
  delay = 0,
  duration = 2.6,
  repeatDelay = 3.2,
  light = true,
}: ShimmerSweepProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      initial={{ x: '-140%' }}
      animate={{ x: '240%' }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 will-change-transform ${
        light
          ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent'
          : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'
      }`}
    />
  );
}

interface MarqueeRibbonProps {
  items: string[];
  className?: string;
  reverse?: boolean;
  speedSeconds?: number;
}

export function MarqueeRibbon({
  items,
  className = '',
  reverse = false,
  speedSeconds = 26,
}: MarqueeRibbonProps) {
  const prefersReduced = useReducedMotion();
  const line = items.join('  ·  ') + '  ·  ';

  return (
    <div
      className={`overflow-hidden border-y border-black/12 bg-white/38 py-3.5 backdrop-blur-[4px] ${className}`}
    >
      {prefersReduced ? (
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10 font-mono-index text-[12px] text-[#3B404C] truncate">
          {items.join(' · ')}
        </div>
      ) : (
        <div className="flex w-max">
          <motion.div
            animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
            transition={{
              duration: speedSeconds,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex whitespace-nowrap will-change-transform font-mono-index text-[12px] tracking-[0.04em] text-[#3B404C]"
          >
            <span className="pr-2">{line}</span>
            <span className="pr-2" aria-hidden="true">
              {line}
            </span>
          </motion.div>
        </div>
      )}
    </div>
  );
}

interface HairlineDividerProps {
  className?: string;
  delay?: number;
  dark?: boolean;
  glint?: boolean;
}

export function HairlineDivider({
  className = '',
  delay = 0,
  dark = false,
  glint = true,
}: HairlineDividerProps) {
  const prefersReduced = useReducedMotion();
  const bgClass = dark ? 'bg-white/25' : 'bg-black/14';

  if (prefersReduced) {
    return (
      <div
        className={`h-px w-full ${bgClass} ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`relative h-px w-full overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className={`h-full w-full ${bgClass} origin-left`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.95, delay, ease: EXPO_EASE }}
      />
      {glint && (
        <motion.div
          initial={{ x: '-30%' }}
          animate={{ x: '430%' }}
          transition={{
            duration: 3.4,
            delay: delay + 0.5,
            repeat: Infinity,
            repeatDelay: 2.2,
            ease: 'easeInOut',
          }}
          className={`absolute inset-y-0 left-0 w-1/4 will-change-transform ${
            dark
              ? 'bg-gradient-to-r from-transparent via-white/80 to-transparent'
              : 'bg-gradient-to-r from-transparent via-[#111111]/65 to-transparent'
          }`}
        />
      )}
    </div>
  );
}

interface MaskedLineRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function MaskedLineReveal({
  children,
  delay = 0,
  className = '',
}: MaskedLineRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <span className={`block ${className}`}>{children}</span>;
  }

  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: '108%', opacity: 0.4 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 1.0, delay, ease: EXPO_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function MaskedInViewReveal({
  children,
  delay = 0,
  className = '',
}: MaskedLineRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <span className={`block ${className}`}>{children}</span>;
  }

  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: '108%', opacity: 0.35 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.95, delay, ease: EXPO_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

interface CurtainRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  onScroll?: boolean;
}

export function CurtainReveal({
  children,
  delay = 0.2,
  className = '',
  onScroll = false,
}: CurtainRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  if (onScroll) {
    return (
      <motion.div
        className={`overflow-hidden ${className}`}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, amount: 0.01 }}
        transition={{ duration: 1.0, delay, ease: EXPO_EASE }}
      >
        <motion.div
          className="h-full w-full will-change-transform"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 1.15, delay, ease: EXPO_EASE }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: 1.1, delay, ease: EXPO_EASE }}
    >
      <motion.div
        className="h-full w-full will-change-transform"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.25, delay, ease: EXPO_EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  offsetPercent?: number;
  priority?: boolean;
  continuousDrift?: boolean;
  driftDelay?: number;
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  offsetPercent = 4,
  continuousDrift = false,
  driftDelay = 0,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 32,
    mass: 0.3,
  });

  const y = useTransform(
    smoothProgress,
    [0, 1],
    [`-${offsetPercent}%`, `${offsetPercent}%`]
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#E5E7EB] ${className}`}
    >
      {imgError ? (
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-[#ECEEF2] p-6 text-center text-[#52525B]">
          <Building2 className="h-6 w-6 opacity-50" strokeWidth={1.25} />
          <span className="text-xs font-medium tracking-tight text-[#111111]">
            {alt}
          </span>
        </div>
      ) : prefersReduced ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          onError={() => setImgError(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      ) : continuousDrift ? (
        <motion.div
          animate={{
            scale: [1, 1.055, 1],
            x: ['-0.6%', '0.6%', '-0.6%'],
          }}
          transition={{
            duration: 14,
            delay: driftDelay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <motion.img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            onError={() => setImgError(true)}
            style={{ y, scale: 1.11 }}
            className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
          />
        </motion.div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          onError={() => setImgError(true)}
          style={{ y, scale: 1.11 }}
          className={`absolute inset-0 h-full w-full object-cover will-change-transform ${imgClassName}`}
        />
      )}
    </div>
  );
}

interface RollingCounterProps {
  prefix?: string;
  value: string;
  suffix?: string;
  delayOffset?: number;
}

function OdometerDigit({
  digit,
  inView,
  delay,
}: {
  digit: string;
  inView: boolean;
  delay: number;
}) {
  const target = parseInt(digit, 10);
  const prefersReduced = useReducedMotion();

  if (Number.isNaN(target)) {
    return <span>{digit}</span>;
  }

  if (prefersReduced) {
    return <span>{digit}</span>;
  }

  return (
    <span className="relative inline-block h-[1.08em] overflow-hidden align-top leading-[1.08]">
      <motion.span
        className="flex flex-col will-change-transform"
        initial={{ y: '0%' }}
        animate={inView ? { y: `-${target * 10}%` } : { y: '0%' }}
        transition={{
          duration: 1.35,
          delay,
          ease: EXPO_EASE,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="block h-[1.08em] leading-[1.08]">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function RollingCounter({
  prefix = '',
  value,
  suffix = '',
  delayOffset = 0,
}: RollingCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();

  return (
    <span ref={ref} className="inline-flex items-baseline tabular-nums">
      {prefix && (
        <motion.span
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: delayOffset, ease: EXPO_EASE }}
        >
          {prefix}
        </motion.span>
      )}
      {value.split('').map((char, idx) => (
        <OdometerDigit
          key={`${char}-${idx}`}
          digit={char}
          inView={isInView}
          delay={delayOffset + idx * 0.09}
        />
      ))}
      {suffix && (
        <motion.span
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.65,
            delay: delayOffset + value.length * 0.09 + 0.15,
            ease: EXPO_EASE,
          }}
        >
          {suffix}
        </motion.span>
      )}
    </span>
  );
}

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  shimmer?: boolean;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.28,
  shimmer = false,
  onClick,
  type = 'button',
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);

  const springConfig = { stiffness: 280, damping: 20, mass: 0.35 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springInnerX = useSpring(innerX, springConfig);
  const springInnerY = useSpring(innerY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(offsetX);
    y.set(offsetY);
    innerX.set(offsetX * 0.35);
    innerY.set(offsetY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      style={prefersReduced ? undefined : { x: springX, y: springY }}
      whileTap={prefersReduced ? undefined : { scale: 0.96 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      {...(rest as Record<string, unknown>)}
    >
      {shimmer && <ShimmerSweep duration={2.2} repeatDelay={2.8} />}
      <motion.span
        style={prefersReduced ? undefined : { x: springInnerX, y: springInnerY }}
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

interface MagneticLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  strength?: number;
  shimmer?: boolean;
}

export function MagneticLink({
  children,
  className = '',
  strength = 0.24,
  shimmer = false,
  href,
  ...rest
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);

  const springConfig = { stiffness: 280, damping: 20, mass: 0.35 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springInnerX = useSpring(innerX, springConfig);
  const springInnerY = useSpring(innerY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(offsetX);
    y.set(offsetY);
    innerX.set(offsetX * 0.35);
    innerY.set(offsetY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={prefersReduced ? undefined : { x: springX, y: springY }}
      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...(rest as Record<string, unknown>)}
    >
      {shimmer && <ShimmerSweep duration={2.2} repeatDelay={2.6} />}
      <motion.span
        style={prefersReduced ? undefined : { x: springInnerX, y: springInnerY }}
        className="relative z-10 inline-flex items-center gap-3"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
