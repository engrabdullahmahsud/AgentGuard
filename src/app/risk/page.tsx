'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AppHeader } from '@/components/layout/AppHeader';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge, RiskBadge } from '@/components/shared/Badge';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable, Column } from '@/components/shared/DataTable';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { Tabs } from '@/components/ui/Tabs';
import { agents, getRiskDistribution } from '@/lib/data/agents';
import { Agent, RiskFactor } from '@/lib/types';
import {
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  Eye,
  Lock,
  Network,
  Gauge,
  Layers,
  Mail,
  UserCheck,
  Database,
} from 'lucide-react';

const riskDist = getRiskDistribution();
const highRiskAgents = agents.filter((a) => a.risk === 'high');
const mediumRiskAgents = agents.filter((a) => a.risk === 'medium');
const lowRiskAgents = agents.filter((a) => a.risk === 'low');

const riskTrendData = [
  { name: 'Week 1', high: 3, medium: 10, low: 22 },
  { name: 'Week 2', high: 4, medium: 11, low: 23 },
  { name: 'Week 3', high: 4, medium: 12, low: 24 },
  { name: 'Week 4', high: 5, medium: 13, low: 24 },
  { name: 'Week 5', high: 5, medium: 13, low: 24 },
];

const riskFactorsOverview = [
  { name: 'Data\nSensitivity', value: 6.2, icon: Database, description: 'Average data sensitivity score across all agents' },
  { name: 'Permission\nScope', value: 5.1, icon: Shield, description: 'Average permission scope breadth' },
  { name: 'External\nComm', value: 4.3, icon: Mail, description: 'External communication risk exposure' },
  { name: 'Autonomy\nLevel', value: 5.4, icon: Gauge, description: 'Level of autonomous operation' },
  { name: 'Tool\nAccess', value: 5.0, icon: Layers, description: 'Complexity and sensitivity of connected tools' },
  { name: 'Human\nApproval', value: 4.8, icon: UserCheck, description: 'Coverage of human approval workflows' },
  { name: 'Auth\nStrength', value: 3.9, icon: Lock, description: 'Authentication mechanism robustness' },
];

export default function RiskPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'factors', label: 'Risk Factors' },
    { id: 'agents', label: 'Top Risky Agents' },
  ];

  const topRiskColumns: Column<Agent>[] = [
    {
      key: 'name',
      header: 'Agent',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-slate-900">{row.name}</p>
          <p className="text-xs text-slate-500">{row.department}</p>
        </div>
      ),
    },
    {
      key: 'riskScore',
      header: 'Score',
      render: (row) => (
        <span className={`text-sm font-semibold ${
          row.riskScore >= 70 ? 'text-red-600' : row.riskScore >= 40 ? 'text-amber-600' : 'text-emerald-600'
        }`}>
          {row.riskScore}/100
        </span>
      ),
    },
    {
      key: 'risk',
      header: 'Risk',
      render: (row) => <RiskBadge risk={row.risk} />,
    },
    {
      key: 'riskFactors',
      header: 'Top Factor',
      render: (row) => {
        const top = [...row.riskFactors].sort((a, b) => b.score - a.score)[0];
        return <span className="text-sm text-slate-600">{top.name}</span>;
      },
    },
    {
      key: 'permissions',
      header: 'Permissions',
      render: (row) => (
        <span className="text-sm text-slate-600">{row.permissions.length} permissions</span>
      ),
      hidden: 'md',
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      hidden: 'lg',
    },
  ];

  const sortedByRisk = [...agents].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <AppShell>
      <AppHeader title="Risk" subtitle="Security risk assessment and monitoring" />
      <main className="p-6 space-y-6">
        {/* Summary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard
            stat={{
              label: 'High-Risk Agents',
              value: riskDist.high,
              change: '+1 this month',
              changeType: 'negative',
              accent: 'red',
              icon: <AlertTriangle className="h-5 w-5" />,
            }}
          />
          <StatsCard
            stat={{
              label: 'Medium-Risk Agents',
              value: riskDist.medium,
              change: '+3 this month',
              changeType: 'negative',
              accent: 'amber',
              icon: <Shield className="h-5 w-5" />,
            }}
          />
          <StatsCard
            stat={{
              label: 'Low-Risk Agents',
              value: riskDist.low,
              change: '+1 this month',
              changeType: 'positive',
              accent: 'green',
              icon: <Shield className="h-5 w-5" />,
            }}
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Distribution */}
          <Card>
            <CardHeader title="Risk Distribution" subtitle="Current agent risk breakdown" />
            <CardContent>
              <DonutChart
                data={[
                  { name: 'Low', value: riskDist.low, color: '#22c55e' },
                  { name: 'Medium', value: riskDist.medium, color: '#f59e0b' },
                  { name: 'High', value: riskDist.high, color: '#ef4444' },
                ]}
                size={220}
              />
              <div className="flex justify-center gap-6 mt-4">
                {[
                  { label: 'Low', count: riskDist.low, color: 'bg-emerald-500' },
                  { label: 'Medium', count: riskDist.medium, color: 'bg-amber-500' },
                  { label: 'High', count: riskDist.high, color: 'bg-red-500' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="flex items-center gap-1.5 justify-center mb-1">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-xs text-slate-500">{item.label}</span>
                    </div>
                    <p className="text-lg font-semibold text-slate-900">{item.count}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Trend */}
          <Card>
            <CardHeader title="Risk Trend" subtitle="Risk level changes over 5 weeks" />
            <CardContent>
              <LineChart
                data={riskTrendData}
                lines={[
                  { dataKey: 'high', name: 'High', color: '#ef4444' },
                  { dataKey: 'medium', name: 'Medium', color: '#f59e0b' },
                  { dataKey: 'low', name: 'Low', color: '#22c55e' },
                ]}
                height={220}
              />
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Card>
          <div className="px-5">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>

          {activeTab === 'overview' && (
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedByRisk.slice(0, 6).map((agent) => (
                  <div
                    key={agent.id}
                    className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                    onClick={() => { window.location.href = `/agents/${agent.id}`; }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{agent.name}</p>
                        <p className="text-xs text-slate-500">{agent.department}</p>
                      </div>
                      <RiskBadge risk={agent.risk} />
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full ${
                          agent.riskScore >= 70 ? 'bg-red-500' : agent.riskScore >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${agent.riskScore}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${
                        agent.riskScore >= 70 ? 'text-red-600' : agent.riskScore >= 40 ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {agent.riskScore}/100
                      </span>
                      <span className="text-xs text-slate-500">{agent.owner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}

          {activeTab === 'factors' && (
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {riskFactorsOverview.map((factor) => {
                  const Icon = factor.icon;
                  return (
                    <div key={factor.name} className="border border-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 whitespace-pre-line">{factor.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xl font-bold ${
                          factor.value >= 6 ? 'text-red-600' : factor.value >= 4 ? 'text-amber-600' : 'text-emerald-600'
                        }`}>
                          {factor.value.toFixed(1)}
                        </span>
                        <span className="text-xs text-slate-500">avg / 10</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full ${
                            factor.value >= 6 ? 'bg-red-500' : factor.value >= 4 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${(factor.value / 10) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500">{factor.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          )}

          {activeTab === 'agents' && (
            <DataTable
              columns={topRiskColumns}
              data={sortedByRisk}
              rowKey={(row) => row.id}
              onRowClick={(row) => { window.location.href = `/agents/${row.id}`; }}
            />
          )}
        </Card>
      </main>
    </AppShell>
  );
}
