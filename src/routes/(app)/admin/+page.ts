import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch(`${PUBLIC_API_URL}/technologies`);
  if (!res.ok) {
    if (res.status === 404) {
      error(404, 'No technologies found');
    } else {
      error(res.status, 'Failed to load technologies');
    }
  }

  const technologies = await res.json();

  return { technologies };
};
