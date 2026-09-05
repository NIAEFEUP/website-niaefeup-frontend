import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { canDeleteActivity } from '@/lib/api/permissions';
import projects from '$lib/data/api/projects/__list.json';

export const load: PageLoad = async ({ fetch, params }) => {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    error(404, 'Project not found');
  }

  const hasPerms = await canDeleteActivity(fetch);

  return { project, hasPerms };
};
