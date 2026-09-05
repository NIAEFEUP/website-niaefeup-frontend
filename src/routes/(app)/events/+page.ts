import type { PageLoad } from './$types';
import { canCreateActivity } from '$lib/api/permissions';
import type { Event } from '@/types/event';
import eventsData from '$lib/data/api/events/__list.json';

export const load: PageLoad = async ({ fetch }) => {
  const hasPerms = await canCreateActivity(fetch);
  const events: Event[] = eventsData;

  return { events, hasPerms };
};
