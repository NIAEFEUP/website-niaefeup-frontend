import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  let res = await fetch('/api/auth');
  if (res.ok) {
    throw redirect(302, '/');
  }
};
