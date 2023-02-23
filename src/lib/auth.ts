export const JWT_ACCESS_KEY = 'access_token';
export const JWT_REFRESH_KEY = 'refresh_token';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function appendCookieHeader(response: Response, name: string, value: string) {
  response.headers.append(
    'Set-Cookie',
    `${name}=${value}; HttpOnly; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Strict`
  );
}
