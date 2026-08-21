import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-16">
    <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Privacy Policy</h1>
    <p className="text-[var(--text-secondary)] mt-4">Krivexa Technologies privacy policy and data governance practices.</p>
  </div>
);

export const TermsPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-16">
    <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Terms of Service</h1>
    <p className="text-[var(--text-secondary)] mt-4">Terms and conditions governing the use of Krivexa Technologies services.</p>
  </div>
);

export const CookiePolicyPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-16">
    <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Cookie Policy</h1>
    <p className="text-[var(--text-secondary)] mt-4">Information regarding cookies and tracking preferences on our website.</p>
  </div>
);

export const FaqPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-16">
    <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Frequently Asked Questions</h1>
    <p className="text-[var(--text-secondary)] mt-4">Answers to common questions about our services, engagement models, and technology.</p>
  </div>
);

export const NotFoundPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-24 text-center">
    <h1 className="text-6xl font-extrabold text-sky-500">404</h1>
    <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-4">Page Not Found</h2>
    <p className="text-[var(--text-secondary)] mt-2">The page you are looking for does not exist or has been moved.</p>
    <Link
      to="/"
      className="mt-6 inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all"
    >
      Return Home
    </Link>
  </div>
);
