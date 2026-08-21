import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#08111F] text-white">
      {/* Glowing Orb Background & Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/20 to-violet-600/20 rounded-full blur-3xl pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-10 sm:p-20 rounded-[32px] bg-[#0D1728]/90 border border-white/10 backdrop-blur-2xl shadow-2xl text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Transform Your Digital Products?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
            Let's Build Something <span className="text-gradient">Remarkable.</span>
          </h2>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
            Have an idea, a challenge or a product vision? Let's turn it into a scalable digital experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start a Project
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
