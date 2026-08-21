import React from 'react';
import { CASE_STUDIES_DATA } from '../data/mockData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CaseStudiesSection = () => {
  return (
    <section className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Case Studies"
          title="In-Depth Technical & Business"
          gradientText="Success Stories."
          subtitle="Discover how Krivexa Technologies solves operational bottlenecks through software engineering."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {CASE_STUDIES_DATA.map((cs) => (
            <div
              key={cs.id}
              className="group glass-panel p-8 rounded-[24px] border border-[var(--border-subtle)] hover:border-blue-500/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Badge variant="violet" size="sm" className="mb-4">{cs.industry}</Badge>
                <h3 className="text-2xl font-extrabold text-[var(--text-primary)] mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cs.title}
                </h3>

                <div className="space-y-3 text-xs sm:text-sm mb-8">
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">Challenge: </span>
                    <span className="text-[var(--text-secondary)]">{cs.challenge}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">Solution: </span>
                    <span className="text-[var(--text-secondary)]">{cs.solution}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                    Outcome: {cs.outcome}
                  </div>
                </div>
              </div>

              <Link
                to={`/case-studies/${cs.slug}`}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
