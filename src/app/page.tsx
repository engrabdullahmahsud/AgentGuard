'use client';

import { AppShell } from '@/components/layout/AppShell';
import { AppHeader } from '@/components/layout/AppHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { RiskBadge, StatusBadge } from '@/components/shared/Badge';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { DataTable, Column } from '@/components/shared/DataTable';
import { BarChart } from '@/components/charts/BarChart';
import { Button } from '@/components/ui/Button';
import {
  Bot,
  ShieldAlert,
  AlertTriangle,
  Shield,
  ArrowRight,
  Clock,
  Ban,
  CheckCircle2,
  Activity,
  Database,
} from 'lucide-react';
import { agents, getRiskDistribution } from '@/lib/data/agents';
import { policies } from '@/lib/data/policies';
import { activities } from '@/lib/data/activities';
import { Agent, RiskLevel } from '@/lib/types';
import Link from 'next/link';

const riskDist = getRiskDistribution();
const totalAgents = agents.length;
const activeAgents = agents.filter((a) => a.status === 'active').length;
const highRiskCount = riskDist.high;
const policyViolations = policies.reduce((sum, p) => sum + p.violations, 0);

const riskChartData = [
  { name: 'Low', value: riskDist.low, fill: '#22c55e' },
  { name: 'Medium', value: riskDist.medium, fill: '#f59e0b' },
  { name: 'High', value: riskDist.high, fill: '#ef4444' },
];

const weeklyActivityData = [
  { name: 'Mon', value: 120, allowed: 120, blocked: 5, pending: 8 },
  { name: 'Tue', value: 135, allowed: 135, blocked: 8, pending: 12 },
  { name: 'Wed', value: 142, allowed: 142, blocked: 3, pending: 10 },
  { name: 'Thu', value: 155, allowed: 155, blocked: 7, pending: 6 },
  { name: 'Fri', value: 128, allowed: 128, blocked: 4, pending: 9 },
  { name: 'Sat', value: 45, allowed: 45, blocked: 2, pending: 3 },
  { name: 'Sun', value: 38, allowed: 38, blocked: 1, pending: 2 },
];

const highRiskAgents = agents.filter((a) => a.risk === 'high');

const highRiskColumns: Column<Agent>[] = [
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
  { key: 'owner', header: 'Owner' },
  {
    key: 'department',
    header: 'Department',
    hidden: 'sm',
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
    hidden: 'md',
  },
  {
    key: 'lastActive',
    header: 'Last Activity',
    hidden: 'md',
  },
];

const activityIcon = (action: string) => {
  if (action.toLowerCase().includes('payment') || action.toLowerCase().includes('database'))
    return <Database className="h-4 w-4" />;
  if (action.toLowerCase().includes('deploy'))
    return <CheckCircle2 className="h-4 w-4" />;
  if (action.toLowerCase().includes('violat') || action.toLowerCase().includes('block'))
    return <Ban className="h-4 w-4" />;
  if (action.toLowerCase().includes('permission'))
    return <Shield className="h-4 w-4" />;
  return <Activity className="h-4 w-4" />;
};

export default function OverviewPage() {
  return (
    <AppShell>
      <AppHeader title="Overview" subtitle="AI Agent Governance & Security" />
      <main className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            stat={{
              label: 'Total AI Agents',
              value: totalAgents,
              change: `${activeAgents} active`,
              changeType: 'neutral',
              accent: 'blue',
              icon: <Bot className="h-5 w-5" />,
            }}
          />
          <StatsCard
            stat={{
              label: 'Active Agents',
              value: activeAgents,
              change: `${Math.round((activeAgents / totalAgents) * 100)}% of total`,
              changeType: 'positive',
              accent: 'green',
              icon: <Activity className="h-5 w-5" />,
            }}
          />
          <StatsCard
            stat={{
              label: 'High Risk',
              value: highRiskCount,
              change: `${Math.round((highRiskCount / totalAgents) * 100)}% of total`,
              changeType: 'negative',
              accent: 'red',
              icon: <AlertTriangle className="h-5 w-5" />,
            }}
          />
          <StatsCard
            stat={{
              label: 'Policy Violations',
              value: policyViolations,
              change: `${policies.length} policies enforced`,
              changeType: 'neutral',
              accent: 'amber',
              icon: <ShieldAlert className="h-5 w-5" />,
            }}
          />
        </div>

        {/* Risk Distribution & Weekly Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Distribution */}
          <Card>
            <CardHeader title="Risk Distribution" subtitle="Agent risk level breakdown" />
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <BarChart
                  data={riskChartData}
                  height={200}
                  colorByValue
                />
                <div className="flex items-center gap-6">
                  {riskChartData.map((item) => (
                    <div key={item.name} className="text-center">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                        <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-slate-900">{item.value}</p>
                      <p className="text-[11px] text-slate-500">agents</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card>
            <CardHeader
              title="Weekly Activity"
              subtitle="Actions by result type"
              action={
                <Link href="/activity">
                  <Button variant="ghost" size="sm">
                    View all <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              }
            />
            <CardContent>
              <BarChart
                data={weeklyActivityData}
                height={200}
              />
              <div className="flex items-center justify-center gap-5 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                  <span className="text-xs text-slate-500">Allowed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                  <span className="text-xs text-slate-500">Blocked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="text-xs text-slate-500">Pending</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & High Risk Agents */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Recent Security Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader
                title="Recent Security Activity"
                subtitle="Latest events across all agents"
                action={
                  <Link href="/activity">
                    <Button variant="ghost" size="sm">
                      View all <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                }
              />
              <div className="divide-y divide-border-light">
                {activities.slice(0, 5).map((event) => (
                  <div key={event.id} className="px-5 py-3.5 hover:bg-surface-hover transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-1.5 rounded-md bg-slate-100 text-slate-500">
                        {activityIcon(event.action)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 leading-snug">
                          <span className="font-medium">{event.agentName}</span>{' '}
                          {event.action.toLowerCase().includes('request')
                            ? 'requested'
                            : event.action.toLowerCase().includes('violat')
                            ? 'violated'
                            : event.action.toLowerCase().includes('permission')
                            ? 'permissions were modified'
                            : event.action.toLowerCase().includes('access')
                            ? 'accessed'
                            : event.action.toLowerCase().includes('deploy')
                            ? 'deployment was approved'
                            : event.action.toLowerCase().includes('read')
                            ? 'performed'
                            : event.action.toLowerCase().includes('send')
                            ? 'sent'
                            : event.action.toLowerCase().includes('email')
                            ? 'email was blocked'
                            : event.action.toLowerCase().includes('update')
                            ? 'updated'
                            : event.action.toLowerCase().includes('query')
                            ? 'executed'
                            : event.action.toLowerCase().includes('scan')
                            ? 'completed'
                            : event.action.toLowerCase().includes('export')
                            ? 'export attempt'
                            : event.action.toLowerCase().includes('export')
                            ? 'export blocked'
                            : 'performed'}
                          {' '}{event.action.toLowerCase().includes('database') ? 'production database access' : event.action.toLowerCase().includes('policy') ? 'an outbound-data policy' : event.action.toLowerCase().includes('permission') ? '' : event.resource}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">
                            {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="text-xs text-slate-400">·</span>
                          <RiskBadge risk={event.risk} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* High Risk Agents */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader
                title="High Risk Agents"
                subtitle="Agents requiring attention"
                action={
                  <Link href="/risk">
                    <Button variant="ghost" size="sm">
                      View all <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                }
              />
              <DataTable
                columns={highRiskColumns}
                data={highRiskAgents}
                rowKey={(row) => row.id}
                onRowClick={(row) => {
                  window.location.href = `/agents/${row.id}`;
                }}
              />
            </Card>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
