import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code2, Cpu, Database, ShieldCheck, Terminal, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[var(--bg-primary)]">
      {/* Background Animated Orbs & Grid */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-glow-orb pointer-events-none opacity-90" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>BUILDING THE DIGITAL FUTURE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6"
            >
              Building <span className="text-gradient">Digital Experiences</span> That Move Businesses Forward.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10 font-normal"
            >
              Krivexa Technologies helps businesses transform ideas into scalable digital products through modern software, AI, data and cloud technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link to="/contact">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Start a Project
                </Button>
              </Link>

              <Link to="/projects">
                <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Our Work
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Abstract Technology Visualization */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer Glow & Glass Card Container */}
              <div className="glass-panel rounded-3xl p-6 border border-[var(--border-subtle)] shadow-2xl relative overflow-hidden">
                {/* Visual Header Terminal */}
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono text-[var(--text-muted)] ml-2">krivexa-stack.config.ts</span>
                  </div>
                  <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
                </div>

                {/* Floating Tech Component Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Code2 className="w-5 h-5 text-blue-500" />
                      <span className="text-[10px] font-mono font-extrabold text-emerald-500">Active</span>
                    </div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">React 19 & APIs</div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">High Performance</div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Cpu className="w-5 h-5 text-violet-500" />
                      <span className="text-[10px] font-mono font-extrabold text-blue-500">AI ML</span>
                    </div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">Predictive Models</div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">Automated Workflows</div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Database className="w-5 h-5 text-cyan-500" />
                      <span className="text-[10px] font-mono font-extrabold text-cyan-500">PostgreSQL</span>
                    </div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">Relational Data</div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">ACID Compliance</div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      <span className="text-[10px] font-mono font-extrabold text-emerald-500">JWT 256</span>
                    </div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">Security First</div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">Zero Trust Model</div>
                  </motion.div>
                </div>

                {/* Animated Code Snippet Box */}
                <div className="p-4 rounded-2xl bg-[#08111F] text-slate-200 font-mono text-[11px] leading-relaxed border border-white/10 shadow-inner">
                  <div className="text-blue-400">// Krivexa Platform Initialization</div>
                  <div><span className="text-violet-400">import</span> &#123; EnterpriseEngine &#125; <span className="text-violet-400">from</span> <span className="text-emerald-400">'@krivexa/core'</span>;</div>
                  <div><span className="text-violet-400">const</span> app = <span className="text-amber-400">new EnterpriseEngine</span>();</div>
                  <div>await app.<span className="text-blue-400">transform</span>(&#123; scalability: <span className="text-emerald-400">'global'</span> &#125;);</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
