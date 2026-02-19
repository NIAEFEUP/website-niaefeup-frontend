import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/accounts/${params.id}`);
  if (!res.ok) error(res.status, 'User not found');

  const teamMember = await res.json();

  let canEdit = false;
  let viewer = null;

  const authRes = await fetch('/api/auth');
  if (authRes.ok) {
    const auth = await authRes.json();
    viewer = auth?.authenticated_user;
  }

  if (viewer && viewer.id === Number(params.id)) {
    canEdit = true;
  } else if (viewer) {
    const permRes = await fetch('/api/auth/hasPermission/9'); // 9 is SUPERUSER
    if (permRes.ok) {
      const result = await permRes.json();
      if (!result.error) canEdit = true;
    }
  }

  return { teamMember, canEdit };
};
