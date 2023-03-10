import type { RequestHandler } from '@sveltejs/kit';
import { fetchWithAuth } from './proxy';

function endpoint(url: URL) {
  const pathName = url.pathname.replace('/api', '');
  return pathName.startsWith('/') ? pathName.substring(1) : pathName;
}

const dispatchToBackend: RequestHandler = async (event) => {
  const body = event.request.method === 'GET' ? undefined : await event.request.text();
  return fetchWithAuth(event.cookies, endpoint(event.url), event.request.method, undefined, body);
};

export const GET: RequestHandler = dispatchToBackend;
export const POST: RequestHandler = dispatchToBackend;
export const PUT: RequestHandler = dispatchToBackend;
export const DELETE: RequestHandler = dispatchToBackend;
