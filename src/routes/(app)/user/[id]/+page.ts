import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/accounts/${params.id}`);
  if (!res.ok) error(res.status, 'User not found');

  const teamMember = await res.json();

  return { teamMember };
};