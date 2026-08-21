import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const StatCounter = ({
  value,
  label,
  icon,
  description,
  className
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "glass-panel p-6 rounded-2xl border border-[var(--border-subtle)] flex flex-col items-center text-center transition-all duration-300 hover:border-sky-500/30 hover:shadow-lg",
          className
        )
      )}
    >
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <div className="text-2xl sm:text-3xl font-extrabold text-gradient tracking-tight">
        {value}
      </div>
      <div className="text-sm font-bold text-[var(--text-primary)] mt-1">
        {label}
      </div>
      {description && (
        <p className="text-xs text-[var(--text-muted)] mt-1 max-w-[200px]">
          {description}
        </p>
      )}
    </div>
  );
};
