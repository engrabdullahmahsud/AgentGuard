'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AppHeader } from '@/components/layout/AppHeader';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/shared/Badge';
import { Tabs } from '@/components/ui/Tabs';
import {
  Building2,
  Users,
  Shield,
  Bell,
  Key,
  Webhook,
  ChevronRight,
  Check,
  Copy,
} from 'lucide-react';
import { organization, currentUser } from '@/lib/data/user';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('organization');

  const tabs = [
    { id: 'organization', label: 'Organization' },
    { id: 'users', label: 'Users' },
    { id: 'roles', label: 'Roles' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'api', label: 'API Configuration' },
  ];

  return (
    <AppShell>
      <AppHeader title="Settings" subtitle="Platform configuration and administration" />
      <main className="p-6 space-y-6">
        <Card>
          <div className="px-5">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>

          {activeTab === 'organization' && (
            <CardContent>
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Organization Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Organization Name</label>
                      <input
                        type="text"
                        defaultValue={organization.name}
                        className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Plan</label>
                      <div className="flex items-center gap-2">
                        <Badge variant="purple" size="md">{organization.plan}</Badge>
                        <Button variant="ghost" size="sm">Upgrade Plan</Button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Total Agents</label>
                      <p className="text-sm text-slate-700">{organization.agents} registered agents</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          )}

          {activeTab === 'users' && (
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">Team Members</h3>
                  <Button size="sm">
                    <Users className="h-4 w-4" />
                    Invite User
                  </Button>
                </div>
                <div className="divide-y divide-border-light border border-border rounded-lg">
                  {[
                    { name: 'Alex Morgan', email: 'alex.morgan@acme-corp.com', role: 'Security Administrator', status: 'active' },
                    { name: 'Sarah Ahmed', email: 'sarah.ahmed@acme-corp.com', role: 'Finance Director', status: 'active' },
                    { name: 'James Wilson', email: 'james.wilson@acme-corp.com', role: 'Engineering Lead', status: 'active' },
                    { name: 'Michael Chen', email: 'michael.chen@acme-corp.com', role: 'Support Manager', status: 'active' },
                    { name: 'Emily Rodriguez', email: 'emily.rodriguez@acme-corp.com', role: 'HR Manager', status: 'active' },
                    { name: 'David Kim', email: 'david.kim@acme-corp.com', role: 'Sales Director', status: 'inactive' },
                  ].map((user) => (
                    <div key={user.email} className="px-4 py-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-semibold text-brand-700">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={user.status === 'active' ? 'success' : 'default'} dot>
                          {user.role}
                        </Badge>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}

          {activeTab === 'roles' && (
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">Roles & Permissions</h3>
                  <Button size="sm">Create Role</Button>
                </div>
                <div className="divide-y divide-border-light border border-border rounded-lg">
                  {[
                    { name: 'Security Administrator', users: 1, permissions: 'Full access to all features' },
                    { name: 'Department Admin', users: 5, permissions: 'Manage agents within assigned department' },
                    { name: 'Policy Manager', users: 3, permissions: 'Create and edit governance policies' },
                    { name: 'Approver', users: 4, permissions: 'Approve or reject pending agent actions' },
                    { name: 'Viewer', users: 12, permissions: 'Read-only access to dashboards and reports' },
                  ].map((role) => (
                    <div key={role.name} className="px-4 py-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
                          <Shield className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{role.name}</p>
                          <p className="text-xs text-slate-500">{role.permissions}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">{role.users} users</span>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}

          {activeTab === 'security' && (
            <CardContent>
              <div className="max-w-2xl space-y-6">
                <h3 className="text-sm font-semibold text-slate-900">Security Settings</h3>
                {[
                  { label: 'Two-Factor Authentication', desc: 'Require 2FA for all users', enabled: true },
                  { label: 'SSO Integration', desc: 'Enable single sign-on via SAML', enabled: true },
                  { label: 'Session Timeout', desc: 'Automatically log out after 30 minutes of inactivity', enabled: true },
                  { label: 'IP Allowlisting', desc: 'Restrict access to approved IP addresses', enabled: false },
                  { label: 'Audit Log Retention', desc: 'Keep audit logs for 365 days', enabled: true },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{setting.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{setting.desc}</p>
                    </div>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        setting.enabled ? 'bg-brand-600' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          setting.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
                <div className="pt-4 border-t border-border">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          )}

          {activeTab === 'notifications' && (
            <CardContent>
              <div className="max-w-2xl space-y-6">
                <h3 className="text-sm font-semibold text-slate-900">Notification Preferences</h3>
                {[
                  { label: 'Policy Violations', desc: 'Alert when an agent violates a policy', enabled: true },
                  { label: 'High Risk Events', desc: 'Alert for high-risk agent actions', enabled: true },
                  { label: 'Approval Requests', desc: 'Notify when an action requires approval', enabled: true },
                  { label: 'Agent Status Changes', desc: 'Alert when an agent goes offline or is suspended', enabled: false },
                  { label: 'Weekly Summary Report', desc: 'Receive a weekly security summary via email', enabled: true },
                  { label: 'New Agent Registration', desc: 'Alert when a new agent is registered', enabled: true },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{setting.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{setting.desc}</p>
                    </div>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        setting.enabled ? 'bg-brand-600' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          setting.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
                <div className="pt-4 border-t border-border">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          )}

          {activeTab === 'api' && (
            <CardContent>
              <div className="max-w-2xl space-y-6">
                <h3 className="text-sm font-semibold text-slate-900">API Configuration</h3>
                
                {/* API Key */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">API Key</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 font-mono text-sm bg-slate-50 border border-border rounded-md px-3 py-2 text-slate-600">
                      ag_live_sk_••••••••••••••••••••4f8a
                    </div>
                    <Button variant="secondary" size="sm">
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                    <Button variant="ghost" size="sm">Regenerate</Button>
                  </div>
                </div>

                {/* Webhook */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Webhook URL</label>
                  <input
                    type="text"
                    defaultValue="https://api.acme-corp.com/webhooks/agentguard"
                    className="w-full border border-border rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Rate limits */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">Rate Limit</label>
                  <select className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option>1,000 requests/hour</option>
                    <option>5,000 requests/hour</option>
                    <option>10,000 requests/hour</option>
                    <option>Unlimited</option>
                  </select>
                </div>

                {/* Endpoints */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-2">API Endpoints</label>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs space-y-2">
                    <div className="text-slate-400"># Agent endpoints</div>
                    <div><span className="text-emerald-400">GET</span> <span className="text-blue-300">/api/v1/agents</span></div>
                    <div><span className="text-emerald-400">GET</span> <span className="text-blue-300">/api/v1/agents/:id</span></div>
                    <div><span className="text-amber-400">POST</span> <span className="text-blue-300">/api/v1/agents</span></div>
                    <div className="text-slate-400"># Policy endpoints</div>
                    <div><span className="text-emerald-400">GET</span> <span className="text-blue-300">/api/v1/policies</span></div>
                    <div><span className="text-amber-400">POST</span> <span className="text-blue-300">/api/v1/policies</span></div>
                    <div className="text-slate-400"># Activity endpoints</div>
                    <div><span className="text-emerald-400">GET</span> <span className="text-blue-300">/api/v1/activity</span></div>
                    <div className="text-slate-400"># Approval endpoints</div>
                    <div><span className="text-emerald-400">GET</span> <span className="text-blue-300">/api/v1/approvals</span></div>
                    <div><span className="text-amber-400">POST</span> <span className="text-blue-300">/api/v1/approvals/:id/approve</span></div>
                    <div><span className="text-red-400">POST</span> <span className="text-blue-300">/api/v1/approvals/:id/reject</span></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button>Save Configuration</Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </main>
    </AppShell>
  );
}
