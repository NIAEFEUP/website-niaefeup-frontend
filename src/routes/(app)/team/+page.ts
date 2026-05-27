import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { TeamMember } from '@/types/team-member';

type Section = {
  section: string;
  accounts: TeamMember[];
};

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch(`/api/generations/latest`);
  if (!res.ok) {
    if (res.status === 404) {
      error(404, 'No team members found');
    } else {
      error(res.status, 'Failed to load team members');
    }
  }

  const sections: Section[] = await res.json();

  return { sections };
};
