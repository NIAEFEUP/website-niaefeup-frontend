import type { PageLoad } from './$types';
import type { TeamMember } from '@/types/team-member';

type Section = {
  section: string;
  accounts: TeamMember[];
};

import latestData from '$lib/data/api/generations/latest.json';

export const load: PageLoad = async () => {
  // Legacy fetch: We used to fetch data from the backend.
  // This is now commented out because we are using local JSON data for a completely static build.
  /*
  const res = await fetch(`/api/generations/latest`);
  if (!res.ok) {
    if (res.status === 404) {
      error(404, 'No team members found');
    } else {
      error(res.status, 'Failed to load team members');
    }
  }

  const sections: Section[] = await res.json();
  */
  const sections: Section[] = latestData;

  return { sections };
};
