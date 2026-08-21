import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({
  children,
  className,
  hoverable = true,
  glass = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "rounded-[20px] border transition-all duration-300 overflow-hidden",
          glass
            ? "glass-panel"
            : "bg-[var(--bg-card)] border-[var(--border-subtle)] shadow-sm",
          hoverable && "hover:shadow-2xl hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-blue-500/10",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }) => (
  <div className={twMerge(clsx("p-6 pb-4 border-b border-[var(--border-subtle)]", className))}>
    {children}
  </div>
);

export const CardBody = ({ children, className }) => (
  <div className={twMerge(clsx("p-6", className))}>{children}</div>
);

export const CardFooter = ({ children, className }) => (
  <div className={twMerge(clsx("p-6 pt-4 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40", className))}>
    {children}
  </div>
);
