import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { canEditActivity } from './permissions';

describe('Permissions', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return true when user has permission', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: false })
    } as Response);

    const result = await canEditActivity(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/6');
    expect(result).toBe(true);
  });

  it('should return false when API returns error field', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: true })
    } as Response);

    const result = await canEditActivity(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/6');
    expect(result).toBe(false);
  });

  it('should return false when fetch fails (not ok)', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({})
    } as Response);

    const result = await canEditActivity(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/6');
    expect(result).toBe(false);
  });

  it('should return false when fetch throws an error', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    await expect(canEditActivity(fetch as typeof globalThis.fetch)).rejects.toThrow(
      'Network error'
    );
  });
});
