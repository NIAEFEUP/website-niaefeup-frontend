import type { PageLoad } from './$types';
import { canCreateActivity } from '$lib/api/permissions';

export const load: PageLoad = async ({ fetch }) => {
  const hasPerms = await canCreateActivity(fetch);

  return { hasPerms };
};
