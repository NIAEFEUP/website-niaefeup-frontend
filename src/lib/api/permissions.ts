export async function canEditActivity() {
  const perms = await fetch('/api/auth/hasPermission/6');

  if (!perms.ok) {
    return false;
  }

  return !(await perms.json()).error;
}
