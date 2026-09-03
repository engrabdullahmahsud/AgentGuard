'use client';

import { AppShell } from '@/components/layout/AppShell';
import { AppHeader } from '@/components/layout/AppHeader';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge, RiskBadge, StatusBadge } from '@/components/shared/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { useState } from 'react';
import { getAgentById } from '@/lib/data/agents';
import {
  Shield,
  Wrench,
  Database,
  AlertTriangle,
  FileText,
  Activity,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const agent = getAgentById(id);
  const [activeTab, setActiveTab] = useState('overview');

  if (!agent) {
    return (
      <AppShell>
        <AppHeader title="Agent Not Found" />
        <main className="p-6">
          <Card className="p-8 text-center">
            <p className="text-slate-500">Agent not found.</p>
            <Link href="/agents" className="text-brand-600 text-sm mt-2 inline-block hover:underline">
              Back to agents
            </Link>
          </Card>
        </main>
      </AppShell>
    );
  }

  const riskScoreColor =
    agent.riskScore >= 70 ? 'text-red-600' : agent.riskScore >= 40 ? 'text-amber-600' : 'text-emerald-600';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'permissions', label: 'Permissions', count: agent.permissions.length },
    { id: 'tools', label: 'Tools', count: agent.tools.length },
    { id: 'data-access', label: 'Data Access', count: agent.dataAccess.length },
    { id: 'risk', label: 'Risk Assessment' },
    { id: 'activity', label: 'Activity' },
  ];

  return (
    <AppShell>
      <div className="border-b border-border bg-white">
        <div className="px-6 py-3">
          <Link
            href="/agents"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to agents
          </Link>
        </div>
        <div className="px-6 pb-4 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{agent.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <StatusBadge status={agent.status} />
              <RiskBadge risk={agent.risk} />
              <span className="text-sm text-slate-500">
                Owner: <span className="font-medium text-slate-700">{agent.owner}</span>
              </span>
              <span className="text-sm text-slate-500">
                Dept: <span className="font-medium text-slate-700">{agent.department}</span>
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${riskScoreColor}`}>
              {agent.riskScore}<span className="text-lg font-normal">/100</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Risk Score</p>
          </div>
        </div>
        <div className="px-6">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      <main className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader title="Agent Overview" />
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Purpose</p>
                    <p className="text-sm text-slate-700">{agent.purpose}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Model</p>
                    <span className="text-sm font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{agent.model}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Department</p>
                    <p className="text-sm text-slate-700">{agent.department}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Last Active</p>
                    <p className="text-sm text-slate-700">{agent.lastActive}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-slate-900">{agent.permissions.length}</p>
                    <p className="text-xs text-slate-500">Permissions</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-slate-900">{agent.tools.length}</p>
                    <p className="text-xs text-slate-500">Tools</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-slate-900">{agent.dataAccess.length}</p>
                    <p className="text-xs text-slate-500">Data Sources</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <Card>
            <CardHeader title="Permissions" subtitle={`${agent.permissions.length} assigned permissions`} />
            <div className="divide-y divide-border-light">
              {agent.permissions.map((perm, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{perm}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'tools' && (
          <Card>
            <CardHeader title="Tools & Integrations" subtitle={`${agent.tools.length} connected tools`} />
            <div className="divide-y divide-border-light">
              {agent.tools.map((tool, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{tool}</span>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'data-access' && (
          <Card>
            <CardHeader title="Data Access" subtitle={`${agent.dataAccess.length} data sources`} />
            <div className="divide-y divide-border-light">
              {agent.dataAccess.map((data, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center gap-3">
                  <Database className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{data}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-6">
            {/* Risk Score */}
            <Card>
              <CardHeader title="Risk Assessment" subtitle="Comprehensive risk scoring based on multiple factors" />
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${riskScoreColor}`}>
                      {agent.riskScore}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">out of 100</p>
                  </div>
                  <div className="flex-1">
                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          agent.riskScore >= 70 ? 'bg-red-500' : agent.riskScore >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${agent.riskScore}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-slate-400">Low</span>
                      <span className="text-[10px] text-slate-400">Medium</span>
                      <span className="text-[10px] text-slate-400">High</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Factors */}
            <Card>
              <CardHeader title="Risk Factors" />
              <div className="divide-y divide-border-light">
                {agent.riskFactors.map((factor, i) => (
                  <div key={i} className="px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{factor.name}</span>
                      <span className={`text-sm font-semibold ${
                        factor.score >= 7 ? 'text-red-600' : factor.score >= 4 ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {factor.score}/{factor.maxScore}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                      <div
                        className={`h-full rounded-full ${
                          factor.score >= 7 ? 'bg-red-500' : factor.score >= 4 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${(factor.score / factor.maxScore) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">{factor.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader title="Recommendations" />
              <div className="divide-y divide-border-light">
                {agent.recommendations.map((rec, i) => (
                  <div key={i} className="px-5 py-3.5 flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{rec}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'activity' && (
          <Card>
            <CardHeader title="Agent Activity" subtitle="Recent actions and events" />
            <CardContent>
              <div className="text-center py-8 text-slate-400 text-sm">
                <Activity className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                <p>Activity data will be loaded from the activity log.</p>
                <Link href="/activity" className="text-brand-600 hover:underline mt-1 inline-block">
                  View full activity log
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </AppShell>
  );
}
