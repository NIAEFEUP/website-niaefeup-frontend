import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  let res = await fetch(`/api/events/${params.slug}`);
  if (!res.ok) error(res.status, 'Event not found');

  const event = await res.json();

  let hasPerms = false;
  res = await fetch(`/api/auth/hasPermission/6`);
  if (res.status !== 403) hasPerms = true;

  return { event, hasPerms };
};
