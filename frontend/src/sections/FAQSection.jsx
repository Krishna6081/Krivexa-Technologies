import React from 'react';
import { FAQS_DATA } from '../data/mockData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Accordion } from '../components/ui/Accordion';

export const FAQSection = () => {
  return (
    <section className="py-20 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="FAQ"
          title="Frequently Asked"
          gradientText="Questions."
          subtitle="Everything you need to know about engaging Krivexa Technologies for custom software development."
        />

        <Accordion items={FAQS_DATA} allowMultiple={false} />
      </div>
    </section>
  );
};
