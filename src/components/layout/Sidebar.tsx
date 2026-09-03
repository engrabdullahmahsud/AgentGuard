'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Bot,
  ShieldAlert,
  FileText,
  CheckCircle,
  Activity,
  Settings,
  Building2,
  User,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';
import { organization, currentUser } from '@/lib/data/user';

const navigation = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'AI Agents', href: '/agents', icon: Bot },
  { label: 'Risk', href: '/risk', icon: ShieldAlert },
  { label: 'Policies', href: '/policies', icon: FileText },
  { label: 'Approvals', href: '/approvals', icon: CheckCircle, badge: 5 },
  { label: 'Activity', href: '/activity', icon: Activity },
  { label: 'Settings', href: '/settings', icon: Settings },
];

const bottomNav = [
  { label: organization.name, icon: Building2, badge: organization.plan },
  { label: currentUser.name, icon: User, subtitle: currentUser.role },
  { label: 'Help & Support', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-sidebar-bg">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-5 border-b border-sidebar-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
          <ShieldAlert className="h-[18px] w-[18px] text-white" />
        </div>
        <div>
          <span className="text-sm font-semibold text-white tracking-tight">AgentGuard</span>
          <p className="text-[10px] text-sidebar-text leading-tight mt-px">AI Agent Governance</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative',
                isActive
                  ? 'bg-brand-700/30 text-white'
                  : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white'
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r bg-brand-400" />
              )}
              <Icon
                className={clsx(
                  'h-[18px] w-[18px] flex-shrink-0',
                  isActive ? 'text-brand-400' : 'text-sidebar-text group-hover:text-white'
                )}
              />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className={clsx(
                    'px-1.5 py-0.5 text-[10px] font-medium rounded-full',
                    isActive
                      ? 'bg-brand-600/50 text-brand-200'
                      : 'bg-slate-700 text-slate-300'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-sidebar-border px-3 py-3 space-y-1">
        {bottomNav.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-text hover:bg-sidebar-hover hover:text-white transition-colors w-full"
            >
              <Icon className="h-4 w-4 flex-shrink-0 text-sidebar-text group-hover:text-white" />
              <div className="flex-1 text-left">
                <div className="text-xs leading-tight">{item.label}</div>
                {item.subtitle && (
                  <div className="text-[10px] text-slate-500 leading-tight">{item.subtitle}</div>
                )}
              </div>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 bg-brand-600/20 text-brand-300 rounded-full">
                  {item.badge}
                </span>
              )}
              {!item.badge && i < bottomNav.length - 1 && (
                <ChevronRight className="h-3 w-3 text-slate-600" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
