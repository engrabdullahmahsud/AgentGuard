import { clsx } from 'clsx';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
  dot?: boolean;
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'sm',
  dot = false,
  children,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
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

export function RiskBadge({ risk }: { risk: 'low' | 'medium' | 'high' }) {
  const variant = risk === 'high' ? 'danger' : risk === 'medium' ? 'warning' : 'success';
  const label = risk.charAt(0).toUpperCase() + risk.slice(1);
  return <Badge variant={variant} dot>{label}</Badge>;
}

export function StatusBadge({ status }: { status: string }) {
  const variant = status === 'active' ? 'success' : status === 'inactive' ? 'default' : status === 'suspended' ? 'danger' : 'info';
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <Badge variant={variant} dot>{label}</Badge>;
}

export function ActionResultBadge({ result }: { result: string }) {
  const variant = result === 'allowed' ? 'success' : result === 'blocked' ? 'danger' : result === 'pending_approval' ? 'warning' : result === 'approved' ? 'success' : 'danger';
  const label = result.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return <Badge variant={variant}>{label}</Badge>;
}

export function PolicyStatusBadge({ status }: { status: string }) {
  const variant = status === 'active' ? 'success' : status === 'draft' ? 'info' : 'default';
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <Badge variant={variant}>{label}</Badge>;
}
