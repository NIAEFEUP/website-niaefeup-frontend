import { PUBLIC_API_URL } from '$env/static/public';
import type { Cookies } from '@sveltejs/kit';
import { JWT_REFRESH_KEY, JWT_ACCESS_KEY } from '$lib/auth';

async function _fetchAdapter(
  relativeUrl: URL | string,
  method: string,
  body?: string | undefined,
  headers?: Headers | undefined
) {
  const url = new URL(relativeUrl, PUBLIC_API_URL);
  headers ??= new Headers();
  headers.append('Content-Type', 'application/json');
  return fetch(url, { method: method, body, headers });
}

async function _refreshAccessToken(cookies: Cookies): Promise<boolean> {
  const refreshToken = cookies.get(JWT_REFRESH_KEY);
  const response = await _fetchAdapter(
    'auth/refresh',
    'POST',
    JSON.stringify({ token: refreshToken })
  );
  return response.ok;
}

async function _fetchWithAuth(
  allowRefresh: boolean,
  cookies: Cookies,
  relativeUrl: URL | string,
  method: string,
  headers?: HeadersInit,
  body?: string | undefined
): Promise<Response> {
  const jwt = cookies.get(JWT_ACCESS_KEY);
  if (!jwt) {
    return _fetchAdapter(relativeUrl, method, body, new Headers(headers));
  }

  const authHeaders = new Headers(headers);
  authHeaders.append('Authorization', `Bearer ${jwt}`);

  const response = await _fetchAdapter(relativeUrl, method, body, authHeaders);
  if (response.status >= 400 && response.status < 500 && allowRefresh) {
    const refreshedAccessTokenSuccessful = await _refreshAccessToken(cookies);
    if (refreshedAccessTokenSuccessful) {
      return _fetchWithAuth(false, cookies, relativeUrl, method, headers, body);
    }
  }
  return response;
}

export async function fetchWithAuth(
  cookies: Cookies,
  relativeUrl: URL | string,
  method = 'GET',
  headers?: HeadersInit,
  body?: string | undefined
): Promise<Response> {
  return _fetchWithAuth(true, cookies, relativeUrl, method, headers, body);
}
