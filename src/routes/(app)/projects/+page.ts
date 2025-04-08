import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  let res = await fetch(`/api/projects`);
  if (!res.ok) error(res.status, 'No projects found');

  const projects = await res.json();

  let hasPerms = false;
  res = await fetch(`/api/auth/hasPermission/4`);
  if (res.status !== 403) hasPerms = true;

  return { projects, hasPerms };
};
