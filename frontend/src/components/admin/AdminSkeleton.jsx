import React from 'react';

export const AdminSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-32 rounded-[22px] bg-[var(--bg-elevated)]" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 rounded-[24px] bg-[var(--bg-elevated)]" />
        <div className="h-80 rounded-[24px] bg-[var(--bg-elevated)]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 rounded-[24px] bg-[var(--bg-elevated)]" />
        <div className="h-64 rounded-[24px] bg-[var(--bg-elevated)]" />
      </div>
    </div>
  );
};
