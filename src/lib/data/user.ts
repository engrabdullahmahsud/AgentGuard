import { User, Organization } from '../types';

export const currentUser: User = {
  name: 'Alex Morgan',
  email: 'alex.morgan@acme-corp.com',
  role: 'Security Administrator',
  initials: 'AM',
};

export const organization: Organization = {
  name: 'Acme Corporation',
  plan: 'Enterprise',
  agents: 42,
};
