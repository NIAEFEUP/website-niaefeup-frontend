import { PUBLIC_API_URL } from '$env/static/public';
import type { Cookies } from '@sveltejs/kit';

const JWT_ACCESS_KEY = 'jwt';
const JWT_REFRESH_KEY = 'jwt-refresh';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

async function _setSecureCookie(cookies: Cookies, name: string, value: string) {
  cookies.set(name, value, {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'strict',
    httpOnly: true,
    secure: true
  });
}

async function _refreshAccessToken(cookies: Cookies): Promise<boolean> {
  const refreshToken = cookies.get(JWT_REFRESH_KEY);
  const response = await fetch(`${PUBLIC_API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: refreshToken })
  });

  if (response.status !== 200) {
    return false;
  }

  const json = await response.json();
  const accessToken = json['access_token'];
  _setSecureCookie(cookies, JWT_ACCESS_KEY, accessToken);
  return true;
}

async function _fetchWithAuth(
  allowRefresh: boolean,
  cookies: Cookies,
  relativeUrl: URL | string,
  method: string,
  headers?: HeadersInit,
  body?: any
): Promise<Response> {
  const fetchAdapter = (
    relativeUrl: URL | string,
    method: string,
    headers: Headers,
    body?: any
  ) => {
    const url = new URL(relativeUrl, PUBLIC_API_URL);
    headers.append('Content-Type', 'application/json');
    return fetch(url, { method: method, body: JSON.stringify(body), headers });
  };

  const jwt = cookies.get(JWT_ACCESS_KEY);
  if (!jwt) {
    return fetchAdapter(relativeUrl, method, new Headers(headers), body);
  }

  const authHeaders = new Headers(headers);
  authHeaders.append('Authorization', `Bearer ${jwt}`);

  const response = await fetchAdapter(relativeUrl, method, authHeaders, body);
  if (response.status === 401 && allowRefresh) {
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
  method: string = 'GET',
  headers?: HeadersInit,
  body?: any
): Promise<Response> {
  console.log(body);
  return _fetchWithAuth(true, cookies, relativeUrl, method, headers, body);
}

export async function login(cookies: Cookies, email: string, password: string): Promise<boolean> {
  const response = await fetch(`${PUBLIC_API_URL}/auth/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.status !== 200) {
    return false;
  }

  const json = await response.json();
  _setSecureCookie(cookies, JWT_ACCESS_KEY, json['access_token']);
  _setSecureCookie(cookies, JWT_REFRESH_KEY, json['refresh_token']);
  return true;
}

export function logout(cookies: Cookies): void {
  cookies.delete(JWT_ACCESS_KEY);
  cookies.delete(JWT_REFRESH_KEY);
}
