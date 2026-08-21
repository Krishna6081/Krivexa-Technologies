import React from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';

export const ProcessSection = () => {
  const steps = [
    { num: "01", title: "Discovery", desc: "Understanding business objectives, user requirements, and system scope." },
    { num: "02", title: "Planning", desc: "Designing system architecture, tech stack selection, and milestone roadmap." },
    { num: "03", title: "UI/UX Design", desc: "High-fidelity Figma wireframes, design systems, and user testing." },
    { num: "04", title: "Development", desc: "Agile frontend and backend engineering with clean code standards." },
    { num: "05", title: "Testing", desc: "Automated QA suites, security vulnerability audit, and performance tuning." },
    { num: "06", title: "Deployment", desc: "Cloud infrastructure staging, auto-scaling, and production launch." },
    { num: "07", title: "Support", desc: "Continuous monitoring, 24/7 maintenance, and iterative upgrades." }
  ];

  return (
    <section className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Engineering Process"
          title="A Transparent & Disciplined"
          gradientText="7-Step Delivery Timeline."
          subtitle="From initial discovery to continuous cloud operations, we follow an agile software development methodology."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="group glass-panel p-6 rounded-[20px] border border-[var(--border-subtle)] flex flex-col justify-between hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center relative"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-black text-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {s.num}
              </div>
              <h4 className="font-extrabold text-sm text-[var(--text-primary)] mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {s.title}
              </h4>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-auto">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
