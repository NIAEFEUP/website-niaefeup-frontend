import { PUBLIC_JWT_ACCESS_KEY, PUBLIC_JWT_REFRESH_KEY } from '$env/static/public';
import { appendDestroyCookieHeader } from '$lib/api/auth';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
  const accessToken = event.cookies.get(PUBLIC_JWT_ACCESS_KEY);
  const refreshToken = event.cookies.get(PUBLIC_JWT_REFRESH_KEY);
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
  appendDestroyCookieHeader(response, PUBLIC_JWT_ACCESS_KEY);
  appendDestroyCookieHeader(response, PUBLIC_JWT_REFRESH_KEY);
  return response;
};
