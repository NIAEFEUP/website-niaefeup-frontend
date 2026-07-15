import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { canCreateActivity } from '$lib/api/permissions';

export const load: PageLoad = async ({ fetch }) => {
  let res = await fetch(`/api/events/__list`);
  if (!res.ok) {
    if (res.status === 404) {
      error(404, 'No events found');
    } else {
      error(res.status, 'Failed to load events');
    }
  }

  const events = await res.json();

  const hasPerms = await canCreateActivity(fetch);

  return { events, hasPerms };
};
