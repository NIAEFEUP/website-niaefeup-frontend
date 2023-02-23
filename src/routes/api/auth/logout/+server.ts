import { JWT_ACCESS_KEY, JWT_REFRESH_KEY } from '$lib/auth';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
  const accessToken = event.cookies.get(JWT_ACCESS_KEY);
  const refreshToken = event.cookies.get(JWT_REFRESH_KEY);
  if (!accessToken || !refreshToken) {
    return new Response(
      JSON.stringify({
        error: 'You are not logged in'
      }),
      { status: 401 }
    );
  }

  const response = new Response(
    JSON.stringify({
      message: 'You have been logged out'
    }),
    {
      status: 200
    }
  );
  response.headers.append(
    'Set-Cookie',
    `${JWT_ACCESS_KEY}=; HttpOnly; Max-Age=0; Path=/; SameSite=Strict`
  );
  response.headers.append(
    'Set-Cookie',
    `${JWT_REFRESH_KEY}=; HttpOnly; Max-Age=0; Path=/; SameSite=Strict`
  );
  return response;
};
