import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { canDeleteActivity } from '@/lib/api/permissions';

export const load: PageLoad = async ({ fetch, params }) => {
  let res = await fetch(`/api/projects/${params.slug}`);
  if (!res.ok) error(res.status, 'Project not found');

  const project = await res.json();

  let hasPerms = await canDeleteActivity(fetch);

  return { project, hasPerms };
};
