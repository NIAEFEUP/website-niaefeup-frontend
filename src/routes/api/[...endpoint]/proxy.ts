import type { Cookies } from '@sveltejs/kit';
import { PUBLIC_API_URL, PUBLIC_JWT_REFRESH_KEY, PUBLIC_JWT_ACCESS_KEY } from '$env/static/public';
import { appendSetCookieHeader } from '$lib/api/auth';

async function _fetchApi(
  relativeUrl: URL | string,
  method: string,
  body?: string | null,
  headers?: Headers | null
) {
  const url = new URL(relativeUrl, PUBLIC_API_URL);
  headers ??= new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  if (window?.location?.origin) {
    headers.append('Origin', window.location.origin);
  }
  return fetch(url, { method: method, body, headers });
}

async function _refreshAccessToken(cookies: Cookies): Promise<string | null> {
  const refreshToken = cookies.get(PUBLIC_JWT_REFRESH_KEY);
  const response = await _fetchApi('auth/refresh', 'POST', JSON.stringify({ token: refreshToken }));

  if (!response.ok) {
    return null;
  }

  const json = await response.json();
  return json[PUBLIC_JWT_ACCESS_KEY];
}

export async function fetchWithAuth(
  cookies: Cookies,
  relativeUrl: URL | string,
  method: string,
  headers?: HeadersInit,
  body?: string | null
): Promise<Response> {
  const jwt = cookies.get(PUBLIC_JWT_ACCESS_KEY);

  if (!jwt) {
    return _fetchApi(relativeUrl, method, body, new Headers(headers));
  }

  const authHeaders = new Headers(headers);
  authHeaders.append('Authorization', `Bearer ${jwt}`);

  const response = await _fetchApi(relativeUrl, method, body, authHeaders);

  const unauthorized = response.status >= 401 && response.status <= 403;
  if (unauthorized) {
    const accessToken = await _refreshAccessToken(cookies);
    if (!accessToken) {
      return response;
    }

    const newAuthHeaders = new Headers(headers);
    newAuthHeaders.set('Authorization', `Bearer ${accessToken}`);

    const newResponse = await _fetchApi(relativeUrl, method, body, newAuthHeaders);

    if (newResponse.ok) {
      const newResponseWithCookies = new Response(newResponse.clone().body, newResponse);
      appendSetCookieHeader(newResponseWithCookies, PUBLIC_JWT_ACCESS_KEY, accessToken);
      return newResponseWithCookies;
    }
  }

  return response;
}
