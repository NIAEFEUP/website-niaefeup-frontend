import type { PageLoad } from './$types';
import type { TeamMember } from '@/types/team-member';

type Section = {
  section: string;
  accounts: TeamMember[];
};

import latestData from '$lib/data/api/generations/latest.json';

export const load: PageLoad = async () => {
  const sections: Section[] = latestData;

  return { sections };
};
