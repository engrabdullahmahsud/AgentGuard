import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500': variant === 'primary',
          'bg-white text-slate-700 border border-border hover:bg-slate-50 focus:ring-slate-500': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'danger',
          'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-500': variant === 'ghost',
          'text-slate-700 border border-border hover:bg-slate-50 focus:ring-slate-500': variant === 'outline',
        },
        {
          'text-xs px-2.5 py-1.5 gap-1': size === 'sm',
          'text-sm px-3.5 py-2 gap-2': size === 'md',
          'text-sm px-4 py-2.5 gap-2': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
