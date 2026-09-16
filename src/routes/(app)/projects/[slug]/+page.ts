import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import { canDeleteActivity } from '@/lib/api/permissions';
import type { Project } from '@/types/project';
import projects from '$lib/data/api/projects/list.json';

export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));

export const load: PageLoad = async ({ fetch, params }) => {
  const project: Project | undefined = projects.find((p) => p.slug === params.slug);
  if (!project) {
    error(404, 'Project not found');
  }

  const hasPerms = await canDeleteActivity(fetch);

  return { project, hasPerms };
};
