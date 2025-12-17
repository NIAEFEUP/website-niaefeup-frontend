import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  let res = await fetch(`/api/projects/${params.id}`);
  if (!res.ok) error(res.status, 'Project not found');
  const project = await res.json();
  //console.log(project)
  return { project };
};
