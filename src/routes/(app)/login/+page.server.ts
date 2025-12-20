import type { PageServerLoad } from './$types';
import {redirect} from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	let res = await fetch('/api/auth');
    if (res.ok) {
      throw redirect(302, '/');
    }
};