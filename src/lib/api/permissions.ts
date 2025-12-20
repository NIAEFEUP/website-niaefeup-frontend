export async function hasPermission(fetch: typeof globalThis.fetch, number: number) {
  const perms = await fetch(`/api/auth/hasPermission/${number}`);

  if (!perms.ok) {
    return false;
  }

  return !(await perms.json()).error;
}
export async function canCreateAccount(fetch: typeof globalThis.fetch) {
  return await hasPermission(fetch, 0);
}

export async function canViewAccount(fetch: typeof globalThis.fetch) {
  return await hasPermission(fetch, 1);
}

export async function canEditAccount(fetch: typeof globalThis.fetch) {
  return await hasPermission(fetch, 2);
}

export async function canDeleteAccount(fetch: typeof globalThis.fetch) {
  return await hasPermission(fetch, 3);
}

export async function canCreateActivity(fetch: typeof globalThis.fetch) {
  return await hasPermission(fetch, 4);
}

export async function canViewActivity(fetch: typeof globalThis.fetch) {
  return await hasPermission(fetch, 5);
}

export async function canEditActivity(fetch: typeof globalThis.fetch) {
  return await hasPermission(fetch, 6);
}

export async function canDeleteActivity(fetch: typeof globalThis.fetch) {
  return await hasPermission(fetch, 7);
}

export async function canEditSettings(fetch: typeof globalThis.fetch) {
  return await hasPermission(fetch, 8);
}

export async function isSuperUser(fetch: typeof globalThis.fetch) {
  return await hasPermission(fetch, 9);
}
