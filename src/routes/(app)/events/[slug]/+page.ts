import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { canEditActivity } from '$lib/api/permissions';
import type { Event } from '@/types/event';
import events from '$lib/data/api/events/__list.json';

export const load: PageLoad = async ({ fetch, params }) => {
  const event: Event | undefined = events.find((e) => e.slug === params.slug);
  if (!event) {
    error(404, 'Event not found');
  }

  const hasPerms = await canEditActivity(fetch);

  return { event, hasPerms };
};
