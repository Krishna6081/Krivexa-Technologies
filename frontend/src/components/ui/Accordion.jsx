import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
  className
}) => {
  return (
    <div className={twMerge(clsx("border border-[var(--border-subtle)] rounded-2xl overflow-hidden bg-[var(--bg-card)] transition-colors duration-200", className))}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-[var(--text-primary)] hover:text-sky-500 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg">{title}</span>
        <ChevronDown
          className={clsx(
            "w-5 h-5 text-[var(--text-muted)] shrink-0 transition-transform duration-300",
            isOpen && "rotate-180 text-sky-500"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]/50 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Accordion = ({ items = [], allowMultiple = false, className }) => {
  const [openIndexes, setOpenIndexes] = useState([0]);

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={twMerge(clsx("flex flex-col gap-4 w-full", className))}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.question || item.title}
          isOpen={openIndexes.includes(index)}
          onToggle={() => handleToggle(index)}
        >
          {item.answer || item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
