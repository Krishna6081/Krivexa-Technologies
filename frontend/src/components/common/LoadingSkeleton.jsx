import React from 'react';
import { Card, CardBody } from '../ui/Card';

export const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <Card key={idx} hoverable={false} className="animate-pulse">
          <div className="h-48 bg-[var(--bg-elevated)] w-full" />
          <CardBody className="p-6 space-y-4">
            <div className="h-4 bg-[var(--bg-elevated)] rounded-full w-1/3" />
            <div className="h-6 bg-[var(--bg-elevated)] rounded-full w-3/4" />
            <div className="h-4 bg-[var(--bg-elevated)] rounded-full w-full" />
            <div className="h-4 bg-[var(--bg-elevated)] rounded-full w-2/3" />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
