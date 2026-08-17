import type { PageLoad } from './$types';
import { canCreateActivity } from '@/lib/api/permissions';

import projects from '$lib/data/api/projects/__list.json';

export const load: PageLoad = async ({ fetch }) => {
  // Legacy fetch: We used to fetch data from the backend.
  // This is now commented out because we are using local JSON data for a completely static build.
  /*
  let res = await fetch(`/api/projects/__list`);
  if (!res.ok) {
    if (res.status === 404) {
      error(404, 'No projects found');
    } else {
      error(res.status, 'Failed to load projects');
    }
  }

  const projects = await res.json();
  */

  const hasPerms = await canCreateActivity(fetch);

  return { projects, hasPerms };
};
