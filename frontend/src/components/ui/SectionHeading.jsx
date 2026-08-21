import React from 'react';
import { Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const SectionHeading = ({
  kicker,
  title,
  gradientText,
  subtitle,
  align = 'center',
  className,
}) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={twMerge(clsx("flex flex-col max-w-4xl mb-12 sm:mb-16", alignClasses[align], className))}>
      {kicker && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{kicker}</span>
        </div>
      )}
      
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.15]">
        {title}{' '}
        {gradientText && <span className="text-gradient">{gradientText}</span>}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-5 leading-relaxed max-w-2xl font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};
