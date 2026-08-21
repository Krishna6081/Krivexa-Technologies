import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = React.forwardRef(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = "group inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.97]";

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.04] border border-transparent",
    secondary: "bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-blue-500/40 hover:scale-[1.02]",
    outline: "bg-transparent border border-blue-500/40 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500 hover:scale-[1.02]",
    ghost: "bg-transparent hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent",
    dark: "bg-[#08111F] hover:bg-[#0D1728] text-white border border-white/10 shadow-lg hover:shadow-xl hover:scale-[1.03]",
    gradient: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.04]"
  };

  const sizes = {
    sm: "text-xs px-4 py-2 rounded-xl gap-1.5",
    md: "text-sm px-6 py-3 rounded-2xl gap-2",
    lg: "text-base px-8 py-4 rounded-2xl gap-2.5",
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : leftIcon ? (
        <span className="shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
