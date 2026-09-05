import type { PageLoad } from './$types';
import { canCreateActivity } from '@/lib/api/permissions';
import type { Project } from '@/types/project';
import projectsData from '$lib/data/api/projects/__list.json';

export const load: PageLoad = async ({ fetch }) => {
  const hasPerms = await canCreateActivity(fetch);
  const projects: Project[] = projectsData;

  return { projects, hasPerms };
};
