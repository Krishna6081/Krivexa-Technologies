import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export const ActivityChart = ({ inquiriesData = [], applicationsData = [] }) => {
  // Combine monthly inquiry & application trends
  const months = ['May', 'Jun', 'Jul', 'Aug'];
  const chartData = months.map((month) => {
    const inq = inquiriesData.find((d) => d.month === month)?.total || 0;
    const app = applicationsData.find((d) => d.month === month)?.total || 0;
    return {
      month,
      Inquiries: inq,
      Applications: app
    };
  });

  return (
    <div className="p-6 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
            Activity Overview
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Real monthly trends for Inquiries & Job Applications
          </p>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" />
            <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={12} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0D1728',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Area
              type="monotone"
              dataKey="Inquiries"
              stroke="#2563EB"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorInquiries)"
            />
            <Area
              type="monotone"
              dataKey="Applications"
              stroke="#7C3AED"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorApps)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
