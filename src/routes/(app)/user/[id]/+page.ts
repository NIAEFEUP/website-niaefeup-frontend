import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { TeamMember } from '@/types/team-member';

export const load: PageLoad = async ({ fetch, params }) => {
  let res = await fetch(`/api/accounts/${params.id}`);
  if (!res.ok) throw error(res.status, 'User not found');
  const teamMember: TeamMember = await res.json();

  let isOwner = false;
  res = await fetch(`/api/auth`);
  if (res.ok) {
    const authBody = await res.json();
    isOwner = authBody?.authenticated_user?.id === teamMember.id;
  }

  return { teamMember, hasLogoutPerms: isOwner };
};
