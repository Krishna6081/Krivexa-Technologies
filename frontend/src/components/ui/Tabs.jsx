import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  variant = 'pills',
  className
}) => {
  return (
    <div className={twMerge(clsx("flex flex-wrap gap-2 items-center", className))}>
      {tabs.map((tab) => {
        const id = typeof tab === 'string' ? tab : tab.id;
        const label = typeof tab === 'string' ? tab : tab.label;
        const isActive = activeTab === id;

        if (variant === 'underline') {
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={clsx(
                "px-4 py-2 text-sm font-semibold border-b-2 transition-all cursor-pointer",
                isActive
                  ? "border-sky-500 text-sky-500"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
              )}
            >
              {label}
            </button>
          );
        }

        // Pills variant (default)
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={clsx(
              "px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer border",
              isActive
                ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-transparent shadow-md shadow-sky-500/20"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
