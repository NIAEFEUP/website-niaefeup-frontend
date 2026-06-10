import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
  const authRes = await fetch('/api/auth');
  if (authRes.ok) {
    const auth = await authRes.json();
    return { user: auth?.authenticated_user ?? null };
  }
  return { user: null };
};
