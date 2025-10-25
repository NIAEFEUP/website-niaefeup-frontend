import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  let res = await fetch(`/api/projects/${params.id}`);
  console.log(params.id);
  if (!res.ok) error(res.status, 'Project not found');
  const project = await res.json();
  return project;
};
