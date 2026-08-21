import React from 'react';
import { INDUSTRIES_DATA } from '../data/mockData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { HeartPulse, GraduationCap, Landmark, ShoppingBag, Factory, Building, Truck, Rocket, ArrowRight } from 'lucide-react';

const iconMap = {
  HeartPulse: <HeartPulse className="w-6 h-6 text-rose-500" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-indigo-500" />,
  Landmark: <Landmark className="w-6 h-6 text-amber-500" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-purple-500" />,
  Factory: <Factory className="w-6 h-6 text-cyan-500" />,
  Building: <Building className="w-6 h-6 text-teal-500" />,
  Truck: <Truck className="w-6 h-6 text-blue-500" />,
  Rocket: <Rocket className="w-6 h-6 text-emerald-500" />
};

export const IndustriesSection = () => {
  return (
    <section className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Industry Focus"
          title="Domain Expertise Across"
          gradientText="Vertical Enterprise Sectors."
          subtitle="We engineer software solutions tailored to regulatory compliance, operational workflows, and data security needs."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES_DATA.map((ind) => (
            <div
              key={ind.id}
              className="group glass-panel p-6 rounded-[20px] border border-[var(--border-subtle)] hover:border-blue-500/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[ind.icon] || <Rocket className="w-6 h-6 text-blue-500" />}
                </div>
                <h3 className="font-extrabold text-lg text-[var(--text-primary)] mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {ind.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  {ind.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Domain Solutions</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
