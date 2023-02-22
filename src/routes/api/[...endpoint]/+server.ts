import type { RequestHandler } from '@sveltejs/kit';
import { fetchWithAuth } from './proxy';

function endpoint(url: URL) {
  const pathName = url.pathname.replace('/api', '');
  return pathName.startsWith('/') ? pathName.substring(1) : pathName;
}

async function dispatchToBackend(event: any, method: string) {
  let body = undefined;
  if (method !== 'GET') {
    body = await event.request.text();
  }
  return fetchWithAuth(event.cookies, endpoint(event.url), method, undefined, body);
}

export const GET: RequestHandler = async (event) => dispatchToBackend(event, 'GET');
export const POST: RequestHandler = async (event) => dispatchToBackend(event, 'POST');
export const PUT: RequestHandler = async (event) => dispatchToBackend(event, 'PUT');
export const DELETE: RequestHandler = async (event) => dispatchToBackend(event, 'DELETE');
