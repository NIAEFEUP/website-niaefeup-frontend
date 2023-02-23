import { JWT_ACCESS_KEY, JWT_REFRESH_KEY } from '$lib/auth';
import type { Handle } from '@sveltejs/kit';

const COOKIE_MAX_AGE = 24 * 60 * 60 * 7;

async function _appendCookieHeader(response: Response, name: string, value: string) {
  response.headers.append(
    'Set-Cookie',
    `${name}=${value}; HttpOnly; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Strict`
  );
}

async function _handleAuthentication(apiResponse: Response): Promise<Response> {
  if (!apiResponse.ok) {
    return apiResponse;
  }

  const serverResponse = new Response(apiResponse.clone().body, apiResponse);
  const json = await apiResponse.json();

  const accessToken = json[JWT_ACCESS_KEY];
  if (accessToken) {
    _appendCookieHeader(serverResponse, JWT_ACCESS_KEY, accessToken);
  }

  const refreshToken = json[JWT_REFRESH_KEY];
  if (refreshToken) {
    _appendCookieHeader(serverResponse, JWT_REFRESH_KEY, refreshToken);
  }

  return serverResponse;
}

export const handle: Handle = async function ({ event, resolve }) {
  const response = await resolve(event);
  return event.url.pathname.includes('api/auth') ? _handleAuthentication(response) : response;
};
