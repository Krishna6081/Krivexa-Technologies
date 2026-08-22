import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminErrorCard = ({ onRetry, message = 'Unable to load live admin dashboard analytics.' }) => {
  return (
    <div className="p-8 sm:p-12 rounded-[28px] bg-[var(--bg-card)] border border-rose-500/20 shadow-xl text-center max-w-xl mx-auto my-12">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-extrabold text-[var(--text-primary)] mb-2">
        Dashboard Loading Error
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-normal">
        {message}
      </p>
      {onRetry && (
        <Button variant="primary" size="md" onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Retry Fetching Data
        </Button>
      )}
    </div>
  );
};
