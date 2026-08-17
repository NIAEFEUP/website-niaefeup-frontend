import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { canDeleteActivity } from '@/lib/api/permissions';

export const load: PageLoad = async ({ fetch, params }) => {
  // Legacy fetch: We used to fetch data from the backend.
  // This is now commented out because we are using local JSON data for a completely static build.
  /*
  let res = await fetch(`/api/projects/${params.slug}`);
  if (!res.ok) error(res.status, 'Project not found');

  const project = await res.json();
  */

  let project;
  try {
    const module = await import(`../../../../lib/data/api/projects/${params.slug}.json`);
    project = module.default;
  } catch {
    error(404, 'Project not found');
  }

  const hasPerms = await canDeleteActivity(fetch);

  return { project, hasPerms };
};
