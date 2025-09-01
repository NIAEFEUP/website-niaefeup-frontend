import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { canEditActivity } from './permissions';

import { PUBLIC_API_URL } from '$env/static/public';

describe('Permissions', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should call the correct endpoint', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ allowed: true })
    });

    const result = await canEditActivity();

    expect(fetch).toHaveBeenCalledWith(`${PUBLIC_API_URL}/auth/hasPermission/6`);
    expect(result).toBe(true);
  });
});
