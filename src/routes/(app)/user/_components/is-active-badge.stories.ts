import IsActiveBadge from './is-active-badge.svelte';
import type { TeamMember } from '@/types/team-member';

export default {
  title: 'Atoms/Icons/Is Active Badge',
  component: IsActiveBadge,
  parameters: {
    layout: 'centered'
  }
};

const inactiveTeamMember: TeamMember = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'A team member who is not active.',
  birthDate: new Date('1990-01-01'),
  role: 'Developer',
  isActive: false
};

const activeTeamMember: TeamMember = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  bio: 'A team member who is active.',
  birthDate: new Date('1990-01-01'),
  role: 'Developer',
  isActive: true
};

export const InactiveBadge = {
  args: {
    teamMember: inactiveTeamMember
  }
};

export const ActiveBadge = {
  args: {
    teamMember: activeTeamMember
  }
};
