import { describe, it, expect } from 'vitest';
import { appendDestroyCookieHeader, appendSetCookieHeader } from './auth';
import { PUBLIC_COOKIE_MAX_AGE } from '$env/static/public';

describe('Appending cookie headers', () => {
  it('should append header to set cookie', () => {
    const response = new Response();
    appendSetCookieHeader(response, 'name', 'value');
    expect(response.headers.get('Set-Cookie')).toBe(
      `name=value; HttpOnly; Max-Age=${PUBLIC_COOKIE_MAX_AGE}; Path=/; SameSite=Strict`
    );
  });

  it('should append header to destroy cookie', () => {
    const response = new Response();
    appendDestroyCookieHeader(response, 'name');
    expect(response.headers.get('Set-Cookie')).toBe(
      `name=; HttpOnly; Max-Age=0; Path=/; SameSite=Strict`
    );
  });
});
