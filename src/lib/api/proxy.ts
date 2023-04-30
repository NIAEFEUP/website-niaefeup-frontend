export function endpoint(url: URL) {
  const pathName = url.pathname.replace('/api', '');
  return pathName.startsWith('/') ? pathName.substring(1) : pathName;
}
