'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AppHeader } from '@/components/layout/AppHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { DataTable, Column } from '@/components/shared/DataTable';
import { RiskBadge, ResultBadge } from '@/components/shared/Badge';
import { activities } from '@/lib/data/activities';
import { ActivityEvent } from '@/lib/types';
import { Download, Filter } from 'lucide-react';

export default function ActivityPage() {
  const [agentFilter, setAgentFilter] = useState('');
  const [resultFilter, setResultFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [search, setSearch] = useState('');

  const agents = [...new Set(activities.map((a) => a.agentName))];
  const results = [...new Set(activities.map((a) => a.result))];
  const risks = ['low', 'medium', 'high'];

  const filtered = activities.filter((a) => {
    if (agentFilter && a.agentName !== agentFilter) return false;
    if (resultFilter && a.result !== resultFilter) return false;
    if (riskFilter && a.risk !== riskFilter) return false;
    if (search && !a.agentName.toLowerCase().includes(search.toLowerCase()) && !a.action.toLowerCase().includes(search.toLowerCase()) && !a.resource.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const columns: Column<ActivityEvent>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (row) => (
        <span className="text-sm text-slate-600 whitespace-nowrap">
          {new Date(row.timestamp).toLocaleString([], {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      key: 'agentName',
      header: 'Agent',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-slate-900">{row.agentName}</p>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      render: (row) => <span className="text-sm text-slate-700">{row.action}</span>,
    },
    {
      key: 'resource',
      header: 'Resource',
      render: (row) => (
        <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
          {row.resource}
        </span>
      ),
      hidden: 'sm',
    },
    {
      key: 'result',
      header: 'Result',
      render: (row) => <ResultBadge result={row.result} />,
    },
    {
      key: 'risk',
      header: 'Risk',
      render: (row) => <RiskBadge risk={row.risk} />,
      hidden: 'md',
    },
  ];

  return (
    <AppShell>
      <AppHeader title="Activity" subtitle="Enterprise audit log and event monitoring" />
      <main className="p-6 space-y-6">
        {/* Stats bar */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-600">
              <span className="font-medium text-slate-900">
                {activities.filter((a) => a.result === 'allowed').length}
              </span>{' '}
              Allowed
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs text-slate-600">
              <span className="font-medium text-slate-900">
                {activities.filter((a) => a.result === 'blocked').length}
              </span>{' '}
              Blocked
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs text-slate-600">
              <span className="font-medium text-slate-900">
                {activities.filter((a) => a.result === 'pending_approval').length}
              </span>{' '}
              Pending
            </span>
          </div>
          <div className="flex-1" />
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            Export Log
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="flex-1 w-full md:w-auto">
              <Input
                icon
                placeholder="Search activity..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Select
                options={agents.map((a) => ({ value: a, label: a }))}
                placeholder="Agent"
                value={agentFilter}
                onChange={(e) => setAgentFilter(e.target.value)}
              />
              <Select
                options={results.map((r) => ({
                  value: r,
                  label: r.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
                }))}
                placeholder="Result"
                value={resultFilter}
                onChange={(e) => setResultFilter(e.target.value)}
              />
              <Select
                options={risks.map((r) => ({ value: r, label: r.charAt(0).toUpperCase() + r.slice(1) }))}
                placeholder="Risk"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
              />
              {(agentFilter || resultFilter || riskFilter || search) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setAgentFilter('');
                    setResultFilter('');
                    setRiskFilter('');
                    setSearch('');
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card>
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <p className="text-sm text-slate-500">
              <span className="font-medium text-slate-700">{filtered.length}</span> event{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
          <DataTable
            columns={columns}
            data={filtered}
            rowKey={(row) => row.id}
          />
        </Card>
      </main>
    </AppShell>
  );
}
