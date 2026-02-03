import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { canEditActivity } from '$lib/api/permissions';

export const load: PageLoad = async ({ fetch, params }) => {
  let res = await fetch(`/api/events/${params.slug}`);
  if (!res.ok) error(res.status, 'Event not found');

  const event = await res.json();

  const hasPerms = await canEditActivity(fetch);

  return { event, hasPerms };
};
