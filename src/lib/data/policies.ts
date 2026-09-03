import { Policy } from '../types';

export const policies: Policy[] = [
  {
    id: 'policy-001',
    name: 'Financial Actions',
    description: 'Controls all financial transactions including payments, transfers, and invoice processing. Ensures proper authorization for monetary operations.',
    scope: 'Finance Department',
    status: 'active',
    violations: 3,
    lastUpdated: '2 days ago',
    rules: [
      {
        conditions: [
          { field: 'Agent', operator: '=', value: 'Finance Assistant' },
          { field: 'Action', operator: '=', value: 'Execute Payment' },
        ],
        action: 'Human Approval',
        value: 'Required',
      },
      {
        conditions: [
          { field: 'Amount', operator: '>', value: '$10,000' },
          { field: 'Action', operator: 'IN', value: 'Payment, Transfer' },
        ],
        action: 'Approval Chain',
        value: 'Manager + Finance Director',
      },
      {
        conditions: [
          { field: 'Action', operator: '=', value: 'Create Invoice' },
          { field: 'Amount', operator: '>', value: '$5,000' },
        ],
        action: 'Human Review',
        value: 'Required Before Send',
      },
    ],
  },
  {
    id: 'policy-002',
    name: 'Production Database Access',
    description: 'Restricts access to production databases and enforces read-only access by default. All write operations require explicit approval.',
    scope: 'Engineering Department',
    status: 'active',
    violations: 2,
    lastUpdated: '5 days ago',
    rules: [
      {
        conditions: [
          { field: 'Target', operator: 'CONTAINS', value: 'production' },
          { field: 'Operation', operator: '=', value: 'WRITE' },
        ],
        action: 'Block',
        value: 'Immediate',
      },
      {
        conditions: [
          { field: 'Target', operator: 'CONTAINS', value: 'production' },
          { field: 'Operation', operator: '=', value: 'READ' },
          { field: 'Records', operator: '>', value: '1000' },
        ],
        action: 'Human Approval',
        value: 'Required',
      },
      {
        conditions: [
          { field: 'Target', operator: 'CONTAINS', value: 'production' },
          { field: 'Operation', operator: '=', value: 'DROP' },
        ],
        action: 'Block',
        value: 'Always',
      },
    ],
  },
  {
    id: 'policy-003',
    name: 'Customer Data Protection',
    description: 'Protects customer PII and sensitive data. Controls data export, sharing, and cross-border data transfers.',
    scope: 'Organization-wide',
    status: 'active',
    violations: 5,
    lastUpdated: '1 day ago',
    rules: [
      {
        conditions: [
          { field: 'Data Type', operator: '=', value: 'Customer PII' },
          { field: 'Action', operator: '=', value: 'Export' },
        ],
        action: 'Human Approval',
        value: 'Required',
      },
      {
        conditions: [
          { field: 'Data Type', operator: 'IN', value: 'Email, Phone, SSN' },
          { field: 'Destination', operator: '=', value: 'External' },
        ],
        action: 'Block',
        value: 'Always',
      },
      {
        conditions: [
          { field: 'Records', operator: '>', value: '100' },
          { field: 'Data Type', operator: '=', value: 'Customer Data' },
        ],
        action: 'Alert',
        value: 'Security Team',
      },
    ],
  },
  {
    id: 'policy-004',
    name: 'External Email',
    description: 'Controls outbound email communications from AI agents. Prevents unauthorized data leakage through email.',
    scope: 'Organization-wide',
    status: 'active',
    violations: 1,
    lastUpdated: '1 week ago',
    rules: [
      {
        conditions: [
          { field: 'Channel', operator: '=', value: 'Email' },
          { field: 'Recipient', operator: 'NOT_IN', value: 'Approved Domains' },
        ],
        action: 'Human Approval',
        value: 'Required',
      },
      {
        conditions: [
          { field: 'Attachment Size', operator: '>', value: '5MB' },
          { field: 'Channel', operator: '=', value: 'Email' },
        ],
        action: 'Block',
        value: 'Auto',
      },
      {
        conditions: [
          { field: 'Content', operator: 'CONTAINS_SENSITIVE', value: 'true' },
          { field: 'Channel', operator: '=', value: 'Email' },
        ],
        action: 'Block',
        value: 'Always',
      },
    ],
  },
  {
    id: 'policy-005',
    name: 'Privileged Operations',
    description: 'Controls high-privilege operations across all agents including admin actions, system modifications, and security-related changes.',
    scope: 'Organization-wide',
    status: 'active',
    violations: 1,
    lastUpdated: '3 days ago',
    rules: [
      {
        conditions: [
          { field: 'Action', operator: 'IN', value: 'Delete, Modify Permissions, Change Config' },
          { field: 'Scope', operator: '=', value: 'System' },
        ],
        action: 'Human Approval',
        value: 'Required + 2FA',
      },
      {
        conditions: [
          { field: 'Action', operator: '=', value: 'Access Admin Panel' },
        ],
        action: 'Rate Limit',
        value: '10/hour',
      },
      {
        conditions: [
          { field: 'Action', operator: '=', value: 'Modify Security Policy' },
        ],
        action: 'Approval Chain',
        value: 'Security Lead + CTO',
      },
    ],
  },
  {
    id: 'policy-006',
    name: 'Data Retention Compliance',
    description: 'Ensures AI agents comply with data retention policies. Automatically flags and handles data that exceeds retention periods.',
    scope: 'Organization-wide',
    status: 'draft',
    violations: 0,
    lastUpdated: 'Today',
    rules: [
      {
        conditions: [
          { field: 'Data Age', operator: '>', value: '90 days' },
          { field: 'Data Type', operator: '=', value: 'Customer Data' },
        ],
        action: 'Alert',
        value: 'Data Protection Officer',
      },
      {
        conditions: [
          { field: 'Data Age', operator: '>', value: '365 days' },
          { field: 'Data Type', operator: 'NOT_IN', value: 'Archive' },
        ],
        action: 'Schedule Deletion',
        value: '30-day notice',
      },
    ],
  },
  {
    id: 'policy-007',
    name: 'API Rate Limiting',
    description: 'Enforces rate limits on API calls made by AI agents to prevent abuse and ensure fair resource usage.',
    scope: 'Organization-wide',
    status: 'disabled',
    violations: 0,
    lastUpdated: '2 weeks ago',
    rules: [
      {
        conditions: [
          { field: 'Endpoint', operator: '=', value: 'External API' },
          { field: 'Calls/Hour', operator: '>', value: '1000' },
        ],
        action: 'Throttle',
        value: '500/hour',
      },
    ],
  },
];
