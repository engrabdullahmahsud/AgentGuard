'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AppHeader } from '@/components/layout/AppHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { DataTable, Column } from '@/components/shared/DataTable';
import { RiskBadge, StatusBadge } from '@/components/shared/Badge';
import { agents } from '@/lib/data/agents';
import { Agent } from '@/lib/types';
import { Plus, Download, Filter } from 'lucide-react';

const departments = [...new Set(agents.map((a) => a.department))];
const risks = ['low', 'medium', 'high'];
const statuses = ['active', 'inactive', 'suspended', 'pending'];
const owners = [...new Set(agents.map((a) => a.owner))];

export default function AgentsPage() {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');

  const filtered = agents.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.purpose.toLowerCase().includes(search.toLowerCase())) return false;
    if (departmentFilter && a.department !== departmentFilter) return false;
    if (riskFilter && a.risk !== riskFilter) return false;
    if (statusFilter && a.status !== statusFilter) return false;
    if (ownerFilter && a.owner !== ownerFilter) return false;
    return true;
  });

  const columns: Column<Agent>[] = [
    {
      key: 'name',
      header: 'Agent',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-slate-900">{row.name}</p>
          <p className="text-xs text-slate-500 truncate max-w-[240px]">{row.purpose}</p>
        </div>
      ),
    },
    {
      key: 'purpose',
      header: 'Purpose',
      render: (row) => (
        <span className="text-sm text-slate-600 line-clamp-1 max-w-[200px]">{row.purpose}</span>
      ),
      hidden: 'lg',
    },
    {
      key: 'owner',
      header: 'Owner',
      render: (row) => <span className="text-sm text-slate-700">{row.owner}</span>,
    },
    {
      key: 'model',
      header: 'Model',
      render: (row) => (
        <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
          {row.model}
        </span>
      ),
      hidden: 'md',
    },
    {
      key: 'risk',
      header: 'Risk',
      render: (row) => <RiskBadge risk={row.risk} />,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
      hidden: 'sm',
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      render: (row) => <span className="text-sm text-slate-500">{row.lastActive}</span>,
      hidden: 'md',
    },
  ];

  return (
    <AppShell>
      <AppHeader
        title="AI Agents"
        subtitle="Discover, manage, and monitor organizational AI agents."
      />
      <main className="p-6 space-y-6">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div />
          <div className="flex items-center gap-3">
            <Button variant="primary" size="sm">
              <Plus className="h-4 w-4" />
              Register Agent
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="flex-1 w-full md:w-auto">
              <Input
                icon
                placeholder="Search agents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Select
                options={departments.map((d) => ({ value: d, label: d }))}
                placeholder="Department"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              />
              <Select
                options={risks.map((r) => ({ value: r, label: r.charAt(0).toUpperCase() + r.slice(1) }))}
                placeholder="Risk"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
              />
              <Select
                options={statuses.map((s) => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
                placeholder="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
              <Select
                options={owners.map((o) => ({ value: o, label: o }))}
                placeholder="Owner"
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
              />
              {(departmentFilter || riskFilter || statusFilter || ownerFilter || search) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDepartmentFilter('');
                    setRiskFilter('');
                    setStatusFilter('');
                    setOwnerFilter('');
                    setSearch('');
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card>
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <p className="text-sm text-slate-500">
              <span className="font-medium text-slate-700">{filtered.length}</span> agent{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
          <DataTable
            columns={columns}
            data={filtered}
            rowKey={(row) => row.id}
            onRowClick={(row) => {
              window.location.href = `/agents/${row.id}`;
            }}
          />
        </Card>
      </main>
    </AppShell>
  );
}
