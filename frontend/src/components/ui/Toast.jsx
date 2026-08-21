import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Toast = ({
  isOpen,
  onClose,
  type = 'success',
  message,
  className
}) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
  };

  const borders = {
    success: "border-emerald-500/30 bg-emerald-500/10",
    error: "border-rose-500/30 bg-rose-500/10",
    info: "border-sky-500/30 bg-sky-500/10",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={twMerge(
            clsx(
              "fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-xl border glass-panel shadow-xl max-w-md",
              borders[type],
              className
            )
          )}
        >
          {icons[type]}
          <span className="text-sm font-semibold text-[var(--text-primary)]">{message}</span>
          <button
            onClick={onClose}
            className="ml-auto text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
