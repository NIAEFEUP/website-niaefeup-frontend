import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/projects/${params.slug}`);
  if (!res.ok) error(res.status, 'Project not found');

  const project = await res.json();

  return { project };
};
