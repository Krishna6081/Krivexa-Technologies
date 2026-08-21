import React from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Cpu, Layers, ShieldCheck, MessageSquare, Lock, CheckCircle2, Headphones, Target } from 'lucide-react';

export const WhyKrivexaSection = () => {
  const benefits = [
    { num: "01", title: "Modern Technology", desc: "Leveraging cutting-edge React 19, Node.js, AI model pipelines, and cloud native containers." },
    { num: "02", title: "Scalable Architecture", desc: "Distributed system design engineered specifically for high user concurrency and traffic spikes." },
    { num: "03", title: "Security First", desc: "Bank-grade JWT authentication, data encryption, CORS protection, and regular vulnerability audits." },
    { num: "04", title: "Transparent Communication", desc: "Agile release cadence with weekly progress demos, open roadmaps, and dedicated channels." },
    { num: "05", title: "Quality Focus", desc: "Automated unit testing, integration tests, and performance tuning embedded in CI/CD." },
    { num: "06", title: "Long-Term Partnership", desc: "Continuous 24/7 post-launch maintenance, cloud operations, and iterative system enhancements." }
  ];

  return (
    <section className="py-24 bg-[#08111F] text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="Why Krivexa?"
          title="Engineered for Performance,"
          gradientText="Built for Long-Term Value."
          subtitle="We combine technical mastery with strategic business focus to build digital products that drive quantifiable enterprise growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-[24px] bg-[#0D1728]/80 border border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-4xl sm:text-5xl font-black text-white/20 group-hover:text-blue-400 group-hover:scale-105 transition-all duration-300 mb-4">
                  {b.num}
                </div>
                <h3 className="text-xl font-extrabold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
