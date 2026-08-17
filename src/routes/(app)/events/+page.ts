import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { canCreateActivity } from '$lib/api/permissions';

import events from '$lib/data/api/events/__list.json';

export const load: PageLoad = async ({ fetch }) => {
  // Legacy fetch: We used to fetch data from the backend. 
  // This is now commented out because we are using local JSON data for a completely static build.
  /*
  let res = await fetch(`/api/events/__list`);
  if (!res.ok) {
    if (res.status === 404) {
      error(404, 'No events found');
    } else {
      error(res.status, 'Failed to load events');
    }
  }

  const events = await res.json();
  */

  const hasPerms = await canCreateActivity(fetch);

  return { events, hasPerms };
};
