'use client';

import { Search, Bell } from 'lucide-react';
import { currentUser } from '@/lib/data/user';

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="h-16 border-b border-border bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-slate-500 leading-tight">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Search */}
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          <Search className="h-[18px] w-[18px]" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-semibold text-brand-700">
            {currentUser.initials}
          </div>
        </div>
      </div>
    </header>
  );
}
