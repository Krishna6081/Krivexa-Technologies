import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

const COLORS = ['#2563EB', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B'];

export const DistributionChart = ({ data = [], title = 'Service Distribution' }) => {
  const chartData = data.length > 0
    ? data
    : [{ name: 'No Data Yet', value: 1 }];

  return (
    <div className="p-6 rounded-[24px] bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
          {title}
        </h3>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          Real database inquiry ratio
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0D1728',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
