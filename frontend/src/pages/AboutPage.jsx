import React from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TEAM_DATA } from '../data/mockData';
import { CTASection } from '../sections/CTASection';
import { CheckCircle2, Lightbulb, Shield, Award, Users, GraduationCap } from 'lucide-react';

export const AboutPage = () => {
  const values = [
    { name: "Innovation", desc: "Pushing boundaries with modern AI, cloud, and reactive frontend architectures.", icon: <Lightbulb className="w-5 h-5 text-sky-500" /> },
    { name: "Integrity", desc: "Uncompromising honesty, transparent billing, and clear communication.", icon: <Shield className="w-5 h-5 text-indigo-500" /> },
    { name: "Quality", desc: "Rigorous automated QA, code reviews, and sub-second performance standards.", icon: <Award className="w-5 h-5 text-purple-500" /> },
    { name: "Transparency", desc: "Agile sprints, accessible progress tracking, and open technical roadmaps.", icon: <Users className="w-5 h-5 text-cyan-500" /> },
    { name: "Customer Success", desc: "Aligning software engineering directly with client growth metrics.", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
    { name: "Continuous Learning", desc: "Constantly mastering new technology frameworks and enterprise patterns.", icon: <GraduationCap className="w-5 h-5 text-amber-500" /> }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            kicker="About Krivexa"
            title="Empowering Enterprise Growth Through"
            gradientText="Scalable Software Engineering."
            subtitle="Krivexa Technologies builds modern digital solutions designed around business requirements, user experience and long-term scalability."
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-3xl border border-[var(--border-subtle)]">
              <div className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-2">Our Mission</div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">To Build Scalable Software Products</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                To transform complex business challenges into sleek, reliable, and high-performance digital products that accelerate business growth and technical independence.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-[var(--border-subtle)]">
              <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">Our Vision</div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Global Technology Leadership</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                To be a trusted global partner for enterprise digital transformation, known for engineering excellence, transparent execution, and technical innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Our Core Values"
            title="The Principles That Drive"
            gradientText="Every Line of Code."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-[var(--border-subtle)] flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--bg-elevated)] shrink-0">{v.icon}</div>
                <div>
                  <h4 className="font-bold text-base text-[var(--text-primary)] mb-1">{v.name}</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Leadership & Team"
            title="Meet the Minds Behind"
            gradientText="Krivexa Technologies."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TEAM_DATA.map((t) => (
              <div key={t.id} className="glass-panel p-6 rounded-3xl border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center gap-6">
                <img src={t.photo} alt={t.name} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{t.name}</h3>
                  <div className="text-xs font-semibold text-sky-500 mb-2">{t.position}</div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
