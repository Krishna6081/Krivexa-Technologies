import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CASE_STUDIES_DATA } from '../data/mockData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CTASection } from '../sections/CTASection';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const CaseStudiesPage = () => {
  return (
    <div className="py-16 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Case Studies"
          title="In-Depth Technical & Business"
          gradientText="Success Breakdown."
          subtitle="Explore how Krivexa Technologies solves operational bottlenecks through software engineering."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {CASE_STUDIES_DATA.map((cs) => (
            <Card key={cs.id} hoverable={true}>
              <CardBody className="p-6">
                <Badge variant="purple" size="sm" className="mb-4">{cs.industry}</Badge>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">{cs.title}</h3>
                
                <div className="space-y-3 text-xs mb-6">
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">Challenge: </span>
                    <span className="text-[var(--text-secondary)]">{cs.challenge}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">Solution: </span>
                    <span className="text-[var(--text-secondary)]">{cs.solution}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">Outcome: </span>
                    <span className="text-emerald-500 font-semibold">{cs.outcome}</span>
                  </div>
                </div>

                <Link
                  to={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-500 hover:text-sky-600"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <CTASection />
    </div>
  );
};

export const CaseStudyDetailPage = () => {
  const { slug } = useParams();
  const cs = CASE_STUDIES_DATA.find((item) => item.slug === slug) || CASE_STUDIES_DATA[0];

  return (
    <div className="py-16 bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/case-studies" className="inline-flex items-center gap-2 text-xs font-bold text-sky-500 hover:text-sky-600 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Case Studies</span>
        </Link>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[var(--border-subtle)]">
          <Badge variant="purple" size="sm" className="mb-4">{cs.industry}</Badge>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-6">{cs.title}</h1>
          
          <div className="space-y-6 text-sm text-[var(--text-secondary)] leading-relaxed">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">The Business Challenge</h3>
              <p>{cs.challenge}</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">The Krivexa Engineering Solution</h3>
              <p>{cs.solution}</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">Technology Stack Employed</h3>
              <p className="font-mono text-sky-500">{cs.technology}</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-semibold">
              Quantifiable Result: {cs.outcome}
            </div>
          </div>
        </div>
      </div>
      <CTASection />
    </div>
  );
};
