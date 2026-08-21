import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Select = React.forwardRef(({
  label,
  error,
  options = [],
  className,
  id,
  children,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-xs font-extrabold text-[var(--text-secondary)] uppercase tracking-wider">
          {label}
        </label>
      )}

      <select
        ref={ref}
        id={selectId}
        className={twMerge(
          clsx(
            "w-full rounded-2xl bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm px-4 py-3.5 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 font-medium",
            error
              ? "border-rose-500 focus:ring-rose-500/40 focus:border-rose-500"
              : "border-[var(--border-subtle)] hover:border-[var(--border-strong)]",
            className
          )
        )}
        {...props}
      >
        {children ? children : options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-rose-500 font-bold mt-0.5">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
