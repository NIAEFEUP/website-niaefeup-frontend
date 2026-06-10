import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const routeParam = params.id;
  const parsedId = Number(routeParam);
  const isNumericParam = Number.isInteger(parsedId) && parsedId > 0;

  let res = await fetch(`/api/projects/${isNumericParam ? parsedId : routeParam}`);
  if (!res.ok) error(res.status, 'Project not found');

  const project = await res.json();
  if (!project || typeof project.id !== 'number') {
    error(500, 'Project id is missing or invalid');
  }

  return { project };
};
