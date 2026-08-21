import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/mockData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, Code, Globe, Smartphone, Cpu, BarChart3, Cloud, Layout, Compass, CheckCircle, Zap } from 'lucide-react';

const iconMap = {
  Code: <Code className="w-7 h-7 text-blue-500" />,
  Globe: <Globe className="w-7 h-7 text-indigo-500" />,
  Smartphone: <Smartphone className="w-7 h-7 text-violet-500" />,
  Cpu: <Cpu className="w-7 h-7 text-cyan-500" />,
  BarChart3: <BarChart3 className="w-7 h-7 text-amber-500" />,
  Cloud: <Cloud className="w-7 h-7 text-sky-400" />,
  Layout: <Layout className="w-7 h-7 text-rose-500" />,
  Compass: <Compass className="w-7 h-7 text-emerald-500" />,
  CheckCircle: <CheckCircle className="w-7 h-7 text-teal-500" />,
  Zap: <Zap className="w-7 h-7 text-yellow-500" />
};

export const ServicesSection = () => {
  const featuredServices = SERVICES_DATA.slice(0, 2);
  const secondaryServices = SERVICES_DATA.slice(2);

  return (
    <section className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Core Engineering Capabilities"
          title="Enterprise Software & Digital"
          gradientText="Solutions Architecture."
          subtitle="From custom distributed systems to AI automation and cloud infrastructure, we build digital products engineered for long-term scale."
        />

        {/* Bento Grid Top: 2 Featured Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {featuredServices.map((service, idx) => (
            <div
              key={service.id}
              className="group glass-panel p-8 sm:p-10 rounded-[24px] border border-[var(--border-subtle)] hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-500/10 to-violet-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {iconMap[service.icon]}
                  </div>
                  <span className="font-mono text-2xl font-black text-[var(--text-muted)] group-hover:text-blue-500 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <Badge variant="indigo" size="sm" className="mb-3">FEATURED SERVICE</Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
                  {service.fullDescription}
                </p>
              </div>

              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors mt-auto"
              >
                <span>Explore Capabilities</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bento Grid Bottom: 8 Standard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {secondaryServices.map((service, idx) => (
            <div
              key={service.id}
              className="group glass-panel p-6 rounded-[20px] border border-[var(--border-subtle)] hover:border-blue-500/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {iconMap[service.icon] || <Code className="w-6 h-6 text-blue-500" />}
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
                    0{idx + 3}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                  {service.shortDescription}
                </p>
              </div>

              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors mt-auto"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
