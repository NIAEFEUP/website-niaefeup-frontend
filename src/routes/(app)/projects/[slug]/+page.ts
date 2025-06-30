import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  let res = await fetch(`/api/projects/${params.slug}`);
  if (!res.ok) error(res.status, 'Project not found');

  const project = await res.json();

  let hasPerms = false;
  res = await fetch(`/api/auth/hasPermission/6`);
  if (res.status !== 403) hasPerms = true;

  return { project, hasPerms };
};
