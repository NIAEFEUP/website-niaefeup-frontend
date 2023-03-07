import { appendCookieHeader } from '$lib/auth';
import { PUBLIC_JWT_ACCESS_KEY, PUBLIC_JWT_REFRESH_KEY } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';

async function _handleAuthentication(apiResponse: Response): Promise<Response> {
  if (!apiResponse.ok) {
    return apiResponse;
  }

  const serverResponse = new Response(apiResponse.clone().body, apiResponse);
  const json = await apiResponse.json();

  const accessToken = json[PUBLIC_JWT_ACCESS_KEY];
  if (accessToken) {
    appendCookieHeader(serverResponse, PUBLIC_JWT_ACCESS_KEY, accessToken);
  }

  const refreshToken = json[PUBLIC_JWT_REFRESH_KEY];
  if (refreshToken) {
    appendCookieHeader(serverResponse, PUBLIC_JWT_REFRESH_KEY, refreshToken);
  }

  return serverResponse;
}

export const handle: Handle = async function ({ event, resolve }) {
  const response = await resolve(event);
  return event.url.pathname.includes('api/auth') ? _handleAuthentication(response) : response;
};
