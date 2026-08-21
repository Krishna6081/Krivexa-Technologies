import React from 'react';
import { SOLUTIONS_DATA } from '../data/mockData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { Check, Layers } from 'lucide-react';

export const SolutionsSection = () => {
  return (
    <section className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Targeted Enterprise Solutions"
          title="Pre-Architected Systems Built for"
          gradientText="Rapid Deployment & Scale."
          subtitle="Proven business management architectures, custom e-commerce engines, CRM/ERP systems, and multi-tenant SaaS platforms."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS_DATA.map((solution, idx) => {
            const isFeatured = idx === 0 || idx === 7;
            return (
              <div
                key={solution.id}
                className={`group bento-card glass-panel p-8 rounded-[24px] border border-[var(--border-subtle)] hover:border-blue-500/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-500/5 to-violet-500/5' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="indigo" size="sm">{solution.category}</Badge>
                    <Layers className="w-5 h-5 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-xl font-extrabold text-[var(--text-primary)] mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {solution.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {solution.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] grid grid-cols-2 gap-2.5">
                  {solution.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)]">
                      <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
