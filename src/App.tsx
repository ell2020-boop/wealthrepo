/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { MotionConfig, useReducedMotion } from 'motion/react';
import { PropertyItem } from './data/siteData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioSection } from './components/PortfolioSection';
import { AboutSection } from './components/AboutSection';
import { ProcessSection } from './components/ProcessSection';
import { FooterConsultation } from './components/FooterConsultation';
import { PropertyDrawer } from './components/PropertyDrawer';
import { AmbientGradientBackdrop } from './components/MotionPrimitives';

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(
    null
  );
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (selectedProperty) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [selectedProperty]);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (lenisRef.current && !prefersReduced) {
      lenisRef.current.scrollTo(target, {
        offset: sectionId === 'top' ? 0 : -64,
      });
    } else {
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-transparent text-[#111111]">
        <AmbientGradientBackdrop />
        {/* Section 1: Minimal Sticky Navbar */}
        <Navbar
          onNavigate={(id) => scrollToSection(id)}
          onBookCall={() => scrollToSection('contact')}
        />

        <main>
          {/* Section 2: Editorial Hero */}
          <Hero
            onExploreListings={() => scrollToSection('listings')}
            onScheduleTour={() => scrollToSection('contact')}
          />

          {/* Section 3: Curated Portfolio (Active & Recently Sold) */}
          <PortfolioSection
            onSelectProperty={(property) => setSelectedProperty(property)}
          />

          {/* Section 4: Meet Shaunda Killingsworth (About + Track Record) */}
          <AboutSection onBookCall={() => scrollToSection('contact')} />

          {/* Section 5: How We Work Together (Buying / Selling Toggle) */}
          <ProcessSection />
        </main>

        {/* Section 6: Client Words + Direct Consultation Footer */}
        <FooterConsultation />

        {/* Slide-Over Property Detail Drawer */}
        <PropertyDrawer
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      </div>
    </MotionConfig>
  );
}
