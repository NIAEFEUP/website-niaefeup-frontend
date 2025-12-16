export async function canCreateActivity(fetch: typeof globalThis.fetch) {
  const perms = await fetch('/api/auth/hasPermission/4');

  if (!perms.ok) {
    return false;
  }

  return !(await perms.json()).error;
}

export async function canEditActivity(fetch: typeof globalThis.fetch) {
  const perms = await fetch('/api/auth/hasPermission/6');

  if (!perms.ok) {
    return false;
  }

  return !(await perms.json()).error;
}
