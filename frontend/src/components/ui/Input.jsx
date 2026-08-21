import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Input = React.forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-extrabold text-[var(--text-secondary)] uppercase tracking-wider">
          {label}
        </label>
      )}
      
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-4 text-[var(--text-muted)] pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={twMerge(
            clsx(
              "w-full rounded-2xl bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm px-4 py-3.5 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 placeholder:text-[var(--text-muted)] font-medium",
              error
                ? "border-rose-500 focus:ring-rose-500/40 focus:border-rose-500"
                : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]",
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              className
            )
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-4 text-[var(--text-muted)] pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-rose-500 font-bold mt-0.5">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[var(--text-muted)] mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
