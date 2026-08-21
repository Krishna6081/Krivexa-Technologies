import React, { useState } from 'react';
import { TECHNOLOGIES_DATA } from '../data/mockData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { Cpu } from 'lucide-react';

export const TechnologySection = () => {
  const categories = Object.keys(TECHNOLOGIES_DATA);
  const [activeTab, setActiveTab] = useState(categories[0]);

  const currentTechs = TECHNOLOGIES_DATA[activeTab] || [];

  return (
    <section className="py-24 bg-[#0D1728] text-slate-100 relative overflow-hidden">
      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="Powered by Modern Tech"
          title="Engineered with Battle-Tested &"
          gradientText="Next-Gen Architecture."
          subtitle="We leverage high-concurrency languages, reactive frontend tools, AI model pipelines, and cloud native containers."
          className="text-white"
        />

        {/* Categories Tab Selector */}
        <div className="flex justify-center mb-12">
          <Tabs
            tabs={categories.map((cat) => ({ id: cat, label: cat }))}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Glass Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {currentTechs.map((tech, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[20px] bg-[#08111F]/80 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-extrabold text-sm shrink-0">
                {tech.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="font-extrabold text-base text-white">{tech.name}</h4>
                  <Badge variant="indigo" size="sm">{tech.level}</Badge>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
