import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({
  title,
  value = 0,
  icon: Icon,
  description,
  trend,
  color = 'blue'
}) => {
  const gradientStyles = {
    blue: 'from-blue-600 to-indigo-600 text-blue-500',
    violet: 'from-indigo-600 to-violet-600 text-violet-500',
    cyan: 'from-cyan-500 to-blue-600 text-cyan-500',
    emerald: 'from-emerald-500 to-teal-600 text-emerald-500',
    amber: 'from-amber-500 to-orange-600 text-amber-500',
    rose: 'from-rose-500 to-pink-600 text-rose-500'
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-6 rounded-[22px] bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-secondary)]">
          {title}
        </span>
        {Icon && (
          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${gradientStyles[color] || gradientStyles.blue} bg-opacity-10 flex items-center justify-center text-white shadow-md shrink-0`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      <div>
        <div className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mb-1">
          {value}
        </div>
        {description && (
          <p className="text-xs text-[var(--text-muted)] font-normal">{description}</p>
        )}
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
          <span>{trend}</span>
        </div>
      )}
    </motion.div>
  );
};
