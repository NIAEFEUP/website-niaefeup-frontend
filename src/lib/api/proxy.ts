export function endpoint(url: URL) {
  const pathName = url.pathname.replace('/api', '').replace('/__list', '');
  return pathName.startsWith('/') ? pathName.substring(1) : pathName;
}
