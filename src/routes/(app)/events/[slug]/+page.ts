import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { canEditActivity } from '$lib/api/permissions';

export const load: PageLoad = async ({ fetch, params }) => {
  // Legacy fetch: We used to fetch data from the backend.
  // This is now commented out because we are using local JSON data for a completely static build.
  /*
  let res = await fetch(`/api/events/${params.slug}`);
  if (!res.ok) error(res.status, 'Event not found');

  const event = await res.json();
  */

  let event;
  try {
    const module = await import(`../../../../lib/data/api/events/${params.slug}.json`);
    event = module.default;
  } catch {
    error(404, 'Event not found');
  }

  const hasPerms = await canEditActivity(fetch);

  return { event, hasPerms };
};
