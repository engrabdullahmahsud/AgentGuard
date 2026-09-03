'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AppHeader } from '@/components/layout/AppHeader';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, RiskBadge } from '@/components/shared/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { pendingApprovals, approvalHistory } from '@/lib/data/activities';
import {
  Check,
  X,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  User,
} from 'lucide-react';

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const tabs = [
    { id: 'pending', label: 'Pending', count: pendingApprovals.length },
    { id: 'history', label: 'History', count: approvalHistory.length },
  ];

  return (
    <AppShell>
      <AppHeader title="Approvals" subtitle="Review and manage agent action approvals" />
      <main className="p-6 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">{pendingApprovals.length}</p>
                <p className="text-xs text-slate-500">Pending Requests</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">
                  {approvalHistory.filter((h) => h.decision === 'approved').length}
                </p>
                <p className="text-xs text-slate-500">Approved Today</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-50 text-red-600">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">
                  {approvalHistory.filter((h) => h.decision === 'rejected').length}
                </p>
                <p className="text-xs text-slate-500">Rejected Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <Card>
          <div className="px-5">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>

          {activeTab === 'pending' && (
            <div className="divide-y divide-border-light">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="p-5 hover:bg-surface-hover transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5">
                        <RiskBadge risk={approval.risk} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-slate-900">{approval.agentName}</h3>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-sm text-slate-600">{approval.action}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Resource: <span className="text-slate-700">{approval.resource}</span>
                          <span className="mx-1.5">·</span>
                          Requested by <span className="text-slate-700">{approval.requester}</span>
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{approval.requestedAt}</span>
                        </div>
                        {expandedId === approval.id && (
                          <div className="mt-3 p-3 bg-slate-50 rounded-md border border-border-light">
                            <p className="text-xs font-medium text-slate-700 mb-1">Description</p>
                            <p className="text-sm text-slate-600">{approval.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedId(expandedId === approval.id ? null : approval.id)}
                      >
                        Details
                      </Button>
                      <Button variant="danger" size="sm">
                        <X className="h-3.5 w-3.5" />
                        Reject
                      </Button>
                      <Button size="sm">
                        <Check className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="divide-y divide-border-light">
              {approvalHistory.map((item) => (
                <div key={item.id} className="px-5 py-4 hover:bg-surface-hover transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {item.decision === 'approved' ? (
                        <div className="p-1.5 rounded-full bg-emerald-50">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        </div>
                      ) : (
                        <div className="p-1.5 rounded-full bg-red-50">
                          <XCircle className="h-4 w-4 text-red-600" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-900">{item.agentName}</span>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-sm text-slate-600">{item.action}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <RiskBadge risk={item.risk} />
                          <span className="text-xs text-slate-500">
                            by {item.decidedBy} · {item.decidedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={item.decision === 'approved' ? 'success' : 'danger'}
                      size="md"
                    >
                      {item.decision.charAt(0).toUpperCase() + item.decision.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>
    </AppShell>
  );
}
