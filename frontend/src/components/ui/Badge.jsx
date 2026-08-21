import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Badge = ({
  variant = 'default',
  size = 'md',
  children,
  icon,
  className,
  ...props
}) => {
  const variants = {
    default: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
    violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20",
    cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    outline: "bg-transparent text-[var(--text-secondary)] border border-[var(--border-strong)] hover:border-blue-500/40",
  };

  const sizes = {
    sm: "text-[10px] px-2.5 py-0.5 rounded-md gap-1 font-bold uppercase tracking-wider",
    md: "text-xs px-3 py-1 rounded-lg gap-1.5 font-bold uppercase tracking-wider",
    lg: "text-xs px-4 py-1.5 rounded-xl gap-2 font-bold uppercase tracking-widest",
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center transition-all duration-200",
          variants[variant],
          sizes[size],
          className
        )
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
