import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/projects`);
  if (!res.ok) error(res.status, 'No projects found');

  const projects = await res.json();

  return { projects };
};
