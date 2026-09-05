import type { PageLoad } from './$types';
import { canCreateActivity } from '@/lib/api/permissions';

import projects from '$lib/data/api/projects/__list.json';

export const load: PageLoad = async ({ fetch }) => {
  const hasPerms = await canCreateActivity(fetch);

  return { projects, hasPerms };
};
