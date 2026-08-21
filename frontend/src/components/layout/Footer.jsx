import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon, YoutubeIcon } from '../common/SocialIcons';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#050B14] text-slate-300 pt-20 pb-12 border-t border-white/10 relative overflow-hidden text-sm">
      {/* Subtle Background Glow Orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Brand Banner & Newsletter */}
        <div className="p-8 sm:p-12 rounded-[28px] bg-[#0B1424] border border-white/10 shadow-2xl mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-500/25">
                K
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">KRIVEXA TECHNOLOGIES</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xl font-normal">
              Building modern digital solutions for ambitious businesses. Empowering enterprises with custom software, AI, and cloud architectures.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="w-full sm:w-72 px-5 py-3.5 rounded-2xl bg-[#08111F] border border-white/15 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/25 cursor-pointer"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed successfully!</span>
              </div>
            )}
          </div>
        </div>

        {/* 4 Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Column 1: COMPANY */}
          <div>
            <h4 className="font-extrabold text-xs text-white uppercase tracking-[0.2em] mb-5">COMPANY</h4>
            <ul className="flex flex-col gap-3 text-xs font-semibold text-slate-400">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link to="/projects" className="hover:text-blue-400 transition-colors">Projects</Link></li>
              <li><Link to="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 2: SERVICES */}
          <div>
            <h4 className="font-extrabold text-xs text-white uppercase tracking-[0.2em] mb-5">SERVICES</h4>
            <ul className="flex flex-col gap-3 text-xs font-semibold text-slate-400">
              <li><Link to="/services/software-development" className="hover:text-blue-400 transition-colors">Software Development</Link></li>
              <li><Link to="/services/web-development" className="hover:text-blue-400 transition-colors">Web Development</Link></li>
              <li><Link to="/services/mobile-app-development" className="hover:text-blue-400 transition-colors">Mobile Apps</Link></li>
              <li><Link to="/services/ai-machine-learning" className="hover:text-blue-400 transition-colors">AI & ML Solutions</Link></li>
              <li><Link to="/services/data-analytics" className="hover:text-blue-400 transition-colors">Data Analytics</Link></li>
              <li><Link to="/services/cloud-solutions" className="hover:text-blue-400 transition-colors">Cloud Architecture</Link></li>
            </ul>
          </div>

          {/* Column 3: RESOURCES */}
          <div>
            <h4 className="font-extrabold text-xs text-white uppercase tracking-[0.2em] mb-5">RESOURCES</h4>
            <ul className="flex flex-col gap-3 text-xs font-semibold text-slate-400">
              <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link to="/case-studies" className="hover:text-blue-400 transition-colors">Case Studies</Link></li>
              <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
              <li><Link to="/technologies" className="hover:text-blue-400 transition-colors">Technologies</Link></li>
            </ul>
          </div>

          {/* Column 4: LEGAL & SOCIAL */}
          <div>
            <h4 className="font-extrabold text-xs text-white uppercase tracking-[0.2em] mb-5">LEGAL & SOCIAL</h4>
            <ul className="flex flex-col gap-3 text-xs font-semibold text-slate-400 mb-6">
              <li><Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              <li><Link to="/admin/login" className="hover:text-blue-400 transition-colors font-bold text-white">Admin Login</Link></li>
            </ul>

            {/* Social Glass Circles */}
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 hover:scale-110 text-slate-300 hover:text-white transition-all shadow-md">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 hover:scale-110 text-slate-300 hover:text-white transition-all shadow-md">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 hover:scale-110 text-slate-300 hover:text-white transition-all shadow-md">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 hover:scale-110 text-slate-300 hover:text-white transition-all shadow-md">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <div>© 2026 Krivexa Technologies. All Rights Reserved.</div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link to="/cookie-policy" className="hover:text-slate-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
