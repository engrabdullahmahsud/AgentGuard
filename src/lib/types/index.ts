export type RiskLevel = 'low' | 'medium' | 'high';
export type AgentStatus = 'active' | 'inactive' | 'suspended' | 'pending';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type ActionResult = 'allowed' | 'blocked' | 'pending_approval' | 'approved' | 'rejected';
export type PolicyStatus = 'active' | 'draft' | 'disabled';

export interface Agent {
  id: string;
  name: string;
  purpose: string;
  owner: string;
  model: string;
  risk: RiskLevel;
  status: AgentStatus;
  department: string;
  lastActive: string;
  riskScore: number;
  permissions: string[];
  tools: string[];
  dataAccess: string[];
  riskFactors: RiskFactor[];
  recommendations: string[];
}

export interface RiskFactor {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  scope: string;
  status: PolicyStatus;
  violations: number;
  lastUpdated: string;
  rules: PolicyRule[];
}

export interface PolicyRule {
  conditions: PolicyCondition[];
  action: string;
  value: string;
}

export interface PolicyCondition {
  field: string;
  operator: string;
  value: string;
}

export interface Approval {
  id: string;
  agentId: string;
  agentName: string;
  action: string;
  risk: RiskLevel;
  requestedAt: string;
  requester: string;
  resource: string;
  description: string;
}

export interface ApprovalHistory {
  id: string;
  agentName: string;
  action: string;
  risk: RiskLevel;
  decidedAt: string;
  decidedBy: string;
  decision: 'approved' | 'rejected';
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  agentName: string;
  agentId: string;
  action: string;
  resource: string;
  result: ActionResult;
  risk: RiskLevel;
  details?: string;
}

export interface StatCard {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  initials: string;
}

export interface Organization {
  name: string;
  plan: string;
  agents: number;
}
