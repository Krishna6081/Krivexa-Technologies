import React from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { MessageSquareQuote } from 'lucide-react';

export const TestimonialsSection = ({ testimonials = [] }) => {
  return (
    <section className="py-20 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Client Feedback"
          title="What Our Clients Say About"
          gradientText="Krivexa Technologies."
          subtitle="Honest reviews and project outcomes from business leaders."
        />

        {testimonials.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-[var(--border-subtle)] max-w-xl mx-auto text-center">
            <MessageSquareQuote className="w-12 h-12 text-sky-500 mx-auto mb-4 opacity-80" />
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Verified Client Testimonials</h3>
            <p className="text-sm text-[var(--text-muted)]">
              Client testimonials will appear here as ongoing client deliverables finish.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-[var(--border-subtle)]">
                <p className="text-xs text-[var(--text-secondary)] italic mb-4">"{t.content}"</p>
                <div className="font-bold text-sm text-[var(--text-primary)]">{t.name}</div>
                <div className="text-[11px] text-[var(--text-muted)]">{t.company}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
