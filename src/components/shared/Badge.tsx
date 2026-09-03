'use client';

import { clsx } from 'clsx';
import { RiskLevel, AgentStatus, ActionResult } from '@/lib/types';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  children: React.ReactNode;
}

export function Badge({ variant = 'default', size = 'sm', dot = false, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        {
          'bg-slate-100 text-slate-700': variant === 'default',
          'bg-emerald-50 text-emerald-700': variant === 'success',
          'bg-amber-50 text-amber-700': variant === 'warning',
          'bg-red-50 text-red-700': variant === 'danger',
          'bg-blue-50 text-blue-700': variant === 'info',
          'bg-purple-50 text-purple-700': variant === 'purple',
        },
        {
          'text-xs px-2 py-0.5 gap-1': size === 'sm',
          'text-xs px-2.5 py-1 gap-1.5': size === 'md',
        }
      )}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full', {
            'bg-slate-400': variant === 'default',
            'bg-emerald-500': variant === 'success',
            'bg-amber-500': variant === 'warning',
            'bg-red-500': variant === 'danger',
            'bg-blue-500': variant === 'info',
            'bg-purple-500': variant === 'purple',
          })}
        />
      )}
      {children}
    </span>
  );
}

const riskVariant: Record<RiskLevel, BadgeVariant> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
};

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return (
    <Badge variant={riskVariant[risk]} dot>
      {risk.charAt(0).toUpperCase() + risk.slice(1)}
    </Badge>
  );
}

const statusVariant: Record<AgentStatus, BadgeVariant> = {
  active: 'success',
  inactive: 'default',
  suspended: 'danger',
  pending: 'info',
};

export function StatusBadge({ status }: { status: AgentStatus }) {
  return (
    <Badge variant={statusVariant[status]} dot>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

const resultVariant: Record<ActionResult, BadgeVariant> = {
  allowed: 'success',
  blocked: 'danger',
  pending_approval: 'warning',
  approved: 'success',
  rejected: 'danger',
};

export function ResultBadge({ result }: { result: ActionResult }) {
  const label = result.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return <Badge variant={resultVariant[result]}>{label}</Badge>;
}
