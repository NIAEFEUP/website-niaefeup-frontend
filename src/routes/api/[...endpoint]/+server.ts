import type { RequestHandler } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';
import { fetchWithAuth } from './proxy';

function endpoint(url: URL) {
  const pathName = url.pathname.replace('/api', '');
  return pathName.startsWith('/') ? pathName.substring(1) : pathName;
}

async function dispatchToBackend(event: any, method: string) {
  return fetchWithAuth(
    event.cookies,
    endpoint(event.url),
    method,
    undefined,
    await event.request.json()
  );
}

export const GET: RequestHandler = async (event) => dispatchToBackend(event, 'GET');
export const POST: RequestHandler = async (event) => dispatchToBackend(event, 'POST');
export const PUT: RequestHandler = async (event) => dispatchToBackend(event, 'PUT');
export const DELETE: RequestHandler = async (event) => dispatchToBackend(event, 'DELETE');
