import type { PageLoad } from './$types';
import { canCreateActivity } from '$lib/api/permissions';

import events from '$lib/data/api/events/__list.json';

export const load: PageLoad = async ({ fetch }) => {
  const hasPerms = await canCreateActivity(fetch);

  return { events, hasPerms };
};
