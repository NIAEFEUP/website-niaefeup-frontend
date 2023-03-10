import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/api/auth');
  const info = await response.text();
  return { info };
};
