import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';

export const AboutPreviewSection = () => {
  const points = [
    "Custom architecture engineered around business workflows",
    "Sub-second performance with modern React & cloud deployments",
    "Transparent communication and agile release cycles",
    "Continuous post-launch maintenance & security hardening"
  ];

  return (
    <section className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Container */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="glass-panel p-8 rounded-3xl border border-[var(--border-subtle)] shadow-xl relative z-10">
                <div className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-2">Our Philosophy</div>
                <h3 className="text-2xl font-extrabold text-[var(--text-primary)] mb-4 leading-tight">
                  Bridging Complex Technology with Clean Business Outcomes.
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  At Krivexa Technologies, software is not just lines of code—it is the digital foundation of your enterprise. We combine intuitive user interfaces with robust backend engineering.
                </p>
                <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs font-medium text-sky-600 dark:text-sky-400">
                  "Innovate. Build. Transform." — Built for long-term reliability.
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 rounded-3xl -z-10 blur-xl" />
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6">
            <SectionHeading
              align="left"
              kicker="About Krivexa"
              title="Technology Built Around"
              gradientText="Your Business."
              subtitle="Krivexa Technologies builds modern digital solutions designed around business requirements, user experience and long-term scalability."
              className="mb-8"
            />

            <div className="flex flex-col gap-3.5 mb-8">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{point}</span>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                More About Krivexa
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
