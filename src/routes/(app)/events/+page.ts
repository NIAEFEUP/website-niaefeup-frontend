import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  let res = await fetch(`/api/events`);
  if (!res.ok) {
    if (res.status === 404) {
      error(404, 'No event found');
    } else {
      error(res.status, 'Failed to load event');
    }
  }

  const events = await res.json();

  let hasPerms = false;
  res = await fetch(`/api/auth/hasPermission/4`);
  if (res.status !== 403) hasPerms = true;

  return {events, hasPerms};
};