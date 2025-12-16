import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { canEditActivity } from './permissions';

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

    const result = await canEditActivity(fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/6');
    expect(result).toBe(true);
  });
});
