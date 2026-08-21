import React from 'react';
import { Layers, ShieldCheck, Cpu, Headphones } from 'lucide-react';
import { StatCounter } from '../components/ui/StatCounter';

export const TrustSection = () => {
  const highlights = [
    { value: "Modern Stack", label: "Technology Ready", icon: <Cpu className="w-6 h-6" />, description: "React 19, Node.js, AI, and Cloud Infrastructure" },
    { value: "Business First", label: "Custom Solutions", icon: <Layers className="w-6 h-6" />, description: "Engineered specifically around user workflows" },
    { value: "Zero Trust", label: "Scalable Architecture", icon: <ShieldCheck className="w-6 h-6" />, description: "Bank-grade security and data isolation" },
    { value: "Long-Term", label: "Dedicated Support", icon: <Headphones className="w-6 h-6" />, description: "Continuous maintenance and post-launch updates" }
  ];

  return (
    <section className="py-12 border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <StatCounter
              key={idx}
              value={item.value}
              label={item.label}
              icon={item.icon}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
