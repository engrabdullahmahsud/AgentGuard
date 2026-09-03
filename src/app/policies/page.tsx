'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AppHeader } from '@/components/layout/AppHeader';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/shared/Badge';
import { Modal } from '@/components/ui/Modal';
import { policies } from '@/lib/data/policies';
import { Policy, PolicyStatus } from '@/lib/types';
import {
  Plus,
  ChevronRight,
  FileText,
  AlertTriangle,
  Clock,
  Eye,
  Edit,
  MoreHorizontal,
  ArrowRight,
} from 'lucide-react';

const statusVariant: Record<PolicyStatus, 'success' | 'info' | 'default'> = {
  active: 'success',
  draft: 'info',
  disabled: 'default',
};

export default function PoliciesPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <AppShell>
      <AppHeader title="Policies" subtitle="Define and enforce governance policies for AI agents" />
      <main className="p-6 space-y-6">
        {/* Header action */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            <span className="font-medium text-slate-700">{policies.length}</span> policies configured
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4" />
            Create Policy
          </Button>
        </div>

        {/* Policy cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {policies.map((policy) => (
            <Card
              key={policy.id}
              className="hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => setSelectedPolicy(policy)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-brand-50 text-brand-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{policy.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{policy.scope}</p>
                    </div>
                  </div>
                  <Badge variant={statusVariant[policy.status]}>
                    {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{policy.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs text-slate-600">
                        {policy.violations} violation{policy.violations !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-xs text-slate-500">{policy.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Policy Detail Modal */}
        <Modal
          isOpen={!!selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
          title={selectedPolicy?.name}
          subtitle={selectedPolicy?.scope}
          size="lg"
        >
          {selectedPolicy && (
            <div className="space-y-5">
              <p className="text-sm text-slate-600">{selectedPolicy.description}</p>

              {/* Meta */}
              <div className="flex items-center gap-4">
                <Badge variant={statusVariant[selectedPolicy.status]} size="md">
                  {selectedPolicy.status.charAt(0).toUpperCase() + selectedPolicy.status.slice(1)}
                </Badge>
                <span className="text-xs text-slate-500">
                  {selectedPolicy.violations} violations
                </span>
                <span className="text-xs text-slate-500">
                  Updated {selectedPolicy.lastUpdated}
                </span>
              </div>

              {/* Rules */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-3">
                  Rules ({selectedPolicy.rules.length})
                </h4>
                <div className="space-y-3">
                  {selectedPolicy.rules.map((rule, i) => (
                    <div key={i} className="bg-slate-900 rounded-lg p-4 font-mono text-xs">
                      <div className="flex items-center gap-2 text-emerald-400 mb-2">
                        <span className="font-semibold">RULE {i + 1}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-start gap-2">
                          <span className="text-amber-400 font-semibold w-14">IF</span>
                          <div className="space-y-1">
                            {rule.conditions.map((cond, j) => (
                              <div key={j} className="flex items-center gap-2">
                                <span className="text-slate-400">{j > 0 ? 'AND' : ''}</span>
                                <span className="text-blue-300">{cond.field}</span>
                                <span className="text-slate-400">{cond.operator}</span>
                                <span className="text-amber-300">{cond.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-cyan-400 font-semibold w-14">THEN</span>
                          <div className="flex items-center gap-2">
                            <span className="text-blue-300">{rule.action}</span>
                            <span className="text-slate-400">=</span>
                            <span className="text-emerald-300">{rule.value}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Create Policy Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create Policy"
          subtitle="Define a new governance policy"
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Policy Name</label>
              <input
                type="text"
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="e.g., Data Export Policy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                rows={3}
                placeholder="Describe the policy purpose and scope..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Scope</label>
              <select className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option>Organization-wide</option>
                <option>Finance Department</option>
                <option>Engineering Department</option>
                <option>Support Department</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateModal(false)}>
                Create Policy
              </Button>
            </div>
          </div>
        </Modal>
      </main>
    </AppShell>
  );
}
