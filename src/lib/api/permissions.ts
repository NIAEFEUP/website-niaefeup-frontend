import { PUBLIC_API_URL } from '$env/static/public';

export async function canEdit() {
  const perms = await fetch(`${PUBLIC_API_URL}/auth/hasPermission/6`);

  if (!perms.ok) {
    return false;
  }

  return !(await perms.json()).error;
}
