import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { TrustSection } from '../sections/TrustSection';
import { AboutPreviewSection } from '../sections/AboutPreviewSection';
import { ServicesSection } from '../sections/ServicesSection';
import { TechnologySection } from '../sections/TechnologySection';
import { SolutionsSection } from '../sections/SolutionsSection';
import { IndustriesSection } from '../sections/IndustriesSection';
import { FeaturedProjectsSection } from '../sections/FeaturedProjectsSection';
import { WhyKrivexaSection } from '../sections/WhyKrivexaSection';
import { ProcessSection } from '../sections/ProcessSection';
import { CaseStudiesSection } from '../sections/CaseStudiesSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { CTASection } from '../sections/CTASection';
import { FAQSection } from '../sections/FAQSection';

export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TrustSection />
      <AboutPreviewSection />
      <ServicesSection />
      <TechnologySection />
      <SolutionsSection />
      <IndustriesSection />
      <FeaturedProjectsSection />
      <WhyKrivexaSection />
      <ProcessSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
    </div>
  );
};
