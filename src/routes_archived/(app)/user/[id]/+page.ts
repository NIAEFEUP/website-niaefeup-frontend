import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { isSuperUser } from '@/lib/api/permissions';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/accounts/${params.id}`);
  if (!res.ok) error(res.status, 'User not found');

  const teamMember = await res.json();

  const authRes = await fetch('/api/auth');
  const authData = authRes.ok ? await authRes.json() : null;
  const viewer = authData?.authenticated_user;

  let canEdit = false;

  if (viewer) {
    const isOwner = viewer.id === Number(params.id);

    if (isOwner) {
      canEdit = true;
    } else {
      canEdit = await isSuperUser(fetch);
    }
  }

  return { teamMember, canEdit };
};
