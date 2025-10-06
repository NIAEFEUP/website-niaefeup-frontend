import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  let res = await fetch(`/api/generations/latest`);

  if (!res.ok) {
    if (res.status === 404) {
      error(404, 'No generation found');
    } else {
      error(res.status, 'Failed to load generation');
    }
  }

  const generation = await res.json();
  return { generation };
};
