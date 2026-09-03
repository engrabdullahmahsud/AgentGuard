'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Stat {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  accent?: 'blue' | 'amber' | 'red' | 'purple' | 'green' | 'slate';
}

const accentBg: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  purple: 'bg-purple-50 text-purple-600',
  green: 'bg-emerald-50 text-emerald-600',
  slate: 'bg-slate-100 text-slate-600',
};

export function StatsCard({ stat }: { stat: Stat }) {
  const accent = stat.accent ?? 'blue';
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 tracking-tight">{stat.value}</p>
        </div>
        {stat.icon && (
          <div className={`p-2 rounded-lg ${accentBg[accent]}`}>{stat.icon}</div>
        )}
      </div>
      {stat.change && (
        <div className="mt-3 flex items-center gap-1 text-xs">
          {stat.changeType === 'positive' && <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />}
          {stat.changeType === 'negative' && <ArrowDownRight className="h-3.5 w-3.5 text-red-600" />}
          <span
            className={
              stat.changeType === 'positive'
                ? 'text-emerald-600'
                : stat.changeType === 'negative'
                ? 'text-red-600'
                : 'text-slate-500'
            }
          >
            {stat.change}
          </span>
        </div>
      )}
    </div>
  );
}
