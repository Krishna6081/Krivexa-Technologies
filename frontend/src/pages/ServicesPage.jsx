import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/mockData';
import { ServicesSection } from '../sections/ServicesSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CTASection } from '../sections/CTASection';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export const ServicesPage = () => {
  return (
    <div>
      <ServicesSection />
      <CTASection />
    </div>
  );
};

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const found = SERVICES_DATA.find((s) => s.slug === slug || s.id === slug);
    setService(found || SERVICES_DATA[0]);
  }, [slug]);

  if (!service) return null;

  return (
    <div className="py-16 bg-[var(--bg-primary)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold text-sky-500 hover:text-sky-600 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>

        {/* Hero */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[var(--border-subtle)] mb-12">
          <Badge variant="indigo" size="md" className="mb-4">Service Deep Dive</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">
            {service.title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-8">
            {service.fullDescription}
          </p>

          <Link to="/contact">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Request {service.title} Quote
            </Button>
          </Link>
        </div>

        {/* Benefits & Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardBody className="p-6">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Key Benefits</h3>
              <div className="flex flex-col gap-3">
                {service.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Core Technologies</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {service.technologies.map((t, idx) => (
                  <Badge key={idx} variant="default" size="md">{t}</Badge>
                ))}
              </div>

              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">Problems We Solve</h3>
              <div className="flex flex-col gap-2">
                {service.problemsSolved.map((p, idx) => (
                  <div key={idx} className="text-xs text-[var(--text-muted)] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Process Timeline */}
        <div className="glass-panel p-8 rounded-3xl border border-[var(--border-subtle)] mb-12">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Development Process</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {service.process.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-center">
                <div className="text-xs font-mono font-bold text-sky-500 mb-1">0{idx + 1}</div>
                <div className="text-xs font-bold text-[var(--text-primary)]">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CTASection />
    </div>
  );
};
