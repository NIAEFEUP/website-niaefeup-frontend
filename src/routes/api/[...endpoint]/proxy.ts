import { PUBLIC_API_URL } from '$env/static/public';
import type { Cookies } from '@sveltejs/kit';
import { JWT_REFRESH_KEY, JWT_ACCESS_KEY, appendCookieHeader } from '$lib/auth';

async function _fetchAdapter(
  relativeUrl: URL | string,
  method: string,
  body?: string | null,
  headers?: Headers | null
) {
  const url = new URL(relativeUrl, PUBLIC_API_URL);
  headers ??= new Headers();
  headers.append('Content-Type', 'application/json');
  return fetch(url, { method: method, body, headers });
}

async function _refreshAccessToken(cookies: Cookies): Promise<string | null> {
  const refreshToken = cookies.get(JWT_REFRESH_KEY);
  const response = await _fetchAdapter(
    'auth/refresh',
    'POST',
    JSON.stringify({ token: refreshToken })
  );

  if (!response.ok) {
    return null;
  }

  const json = await response.json();
  return json[JWT_ACCESS_KEY];
}

export async function fetchWithAuth(
  cookies: Cookies,
  relativeUrl: URL | string,
  method: string,
  headers?: HeadersInit,
  body?: string | null
): Promise<Response> {
  const jwt = cookies.get(JWT_ACCESS_KEY);

  if (!jwt) {
    return _fetchAdapter(relativeUrl, method, body, new Headers(headers));
  }

  const authHeaders = new Headers(headers);
  authHeaders.append('Authorization', `Bearer ${jwt}`);

  const response = await _fetchAdapter(relativeUrl, method, body, authHeaders);

  const unauthorized = response.status >= 401 && response.status <= 403;
  if (unauthorized) {
    const accessToken = await _refreshAccessToken(cookies);
    if (!accessToken) {
      return response;
    }

    const newAuthHeaders = new Headers(headers);
    newAuthHeaders.set('Authorization', `Bearer ${accessToken}`);

    const newResponse = await _fetchAdapter(relativeUrl, method, body, newAuthHeaders);

    if (newResponse.ok) {
      const newResponseWithCookies = new Response(newResponse.clone().body, newResponse);
      appendCookieHeader(newResponseWithCookies, JWT_ACCESS_KEY, accessToken);
      return newResponseWithCookies;
    }
  }

  return response;
}
