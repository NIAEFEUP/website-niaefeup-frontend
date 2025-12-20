import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { canCreateActivity } from '@/lib/api/permissions';

export const load: PageLoad = async ({ fetch }) => {
  let res = await fetch(`/api/projects`);
  if (!res.ok) {
    if (res.status === 404) {
      error(404, 'No projects found');
    } else {
      error(res.status, 'Failed to load projects');
    }
  }

  const projects = await res.json();

  let hasPerms = await canCreateActivity(fetch);

  return { projects, hasPerms };
};
