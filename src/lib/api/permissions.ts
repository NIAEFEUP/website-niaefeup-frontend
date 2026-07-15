enum Permission {
  CREATE_ACCOUNT = 0,
  VIEW_ACCOUNT = 1,
  EDIT_ACCOUNT = 2,
  DELETE_ACCOUNT = 3,
  CREATE_ACTIVITY = 4,
  VIEW_ACTIVITY = 5,
  EDIT_ACTIVITY = 6,
  DELETE_ACTIVITY = 7,
  EDIT_SETTINGS = 8,
  SUPER_USER = 9
}

async function hasPermission(fetch: typeof globalThis.fetch, number: number) {
  // const perms = await fetch(`/api/auth/hasPermission/${number}`);

  // if (!perms.ok) {
  //   return false;
  // }

  // return !(await perms.json()).error;
  return false;
}
export async function canCreateAccount(fetch: typeof globalThis.fetch) {
  return hasPermission(fetch, Permission.CREATE_ACCOUNT);
}

export async function canViewAccount(fetch: typeof globalThis.fetch) {
  return hasPermission(fetch, Permission.VIEW_ACCOUNT);
}

export async function canEditAccount(fetch: typeof globalThis.fetch) {
  return hasPermission(fetch, Permission.EDIT_ACCOUNT);
}

export async function canDeleteAccount(fetch: typeof globalThis.fetch) {
  return hasPermission(fetch, Permission.DELETE_ACCOUNT);
}

export async function canCreateActivity(fetch: typeof globalThis.fetch) {
  return hasPermission(fetch, Permission.CREATE_ACTIVITY);
}

export async function canViewActivity(fetch: typeof globalThis.fetch) {
  return hasPermission(fetch, Permission.VIEW_ACTIVITY);
}

export async function canEditActivity(fetch: typeof globalThis.fetch) {
  return hasPermission(fetch, Permission.EDIT_ACTIVITY);
}

export async function canDeleteActivity(fetch: typeof globalThis.fetch) {
  return hasPermission(fetch, Permission.DELETE_ACTIVITY);
}

export async function canEditSettings(fetch: typeof globalThis.fetch) {
  return hasPermission(fetch, Permission.EDIT_SETTINGS);
}

export async function isSuperUser(fetch: typeof globalThis.fetch) {
  return hasPermission(fetch, Permission.SUPER_USER);
}
