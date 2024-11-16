import type { RequestHandler } from '@sveltejs/kit';
import { fetchWithAuth } from './proxy';
import { endpoint } from '$lib/api/proxy';

const dispatchToBackend: RequestHandler = async (event) => {
  const body =
    event.request.method === 'GET' ||
    event.request.method === 'OPTIONS' ||
    event.request.method === 'HEAD'
      ? undefined
      : await event.request.text();
  return fetchWithAuth(event.cookies, endpoint(event.url), event.request.method, undefined, body);
};

export const GET: RequestHandler = dispatchToBackend;
export const POST: RequestHandler = dispatchToBackend;
export const PUT: RequestHandler = dispatchToBackend;
export const DELETE: RequestHandler = dispatchToBackend;
export const PATCH: RequestHandler = dispatchToBackend;
export const OPTIONS: RequestHandler = dispatchToBackend;
export const HEAD: RequestHandler = dispatchToBackend;
