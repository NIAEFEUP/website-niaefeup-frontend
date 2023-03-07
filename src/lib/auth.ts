import { PUBLIC_COOKIE_MAX_AGE } from '$env/static/public';

export async function appendCookieHeader(response: Response, name: string, value: string) {
  response.headers.append(
    'Set-Cookie',
    `${name}=${value}; HttpOnly; Max-Age=${PUBLIC_COOKIE_MAX_AGE}; Path=/; SameSite=Strict`
  );
}
