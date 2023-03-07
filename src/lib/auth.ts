import { PUBLIC_COOKIE_MAX_AGE } from '$env/static/public';

export async function appendSetCookieHeader(response: Response, name: string, value: string) {
  response.headers.append(
    'Set-Cookie',
    `${name}=${value}; HttpOnly; Max-Age=${PUBLIC_COOKIE_MAX_AGE}; Path=/; SameSite=Strict`
  );
}

export async function appendDestroyCookieHeader(response: Response, name: string) {
  response.headers.append('Set-Cookie', `${name}=; HttpOnly; Max-Age=0; Path=/; SameSite=Strict`);
}
