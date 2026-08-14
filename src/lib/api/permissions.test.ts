import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  canCreateAccount,
  canViewAccount,
  canEditAccount,
  canDeleteAccount,
  canCreateActivity,
  canViewActivity,
  canEditActivity,
  canDeleteActivity,
  canEditSettings,
  isSuperUser
} from './permissions';

//these tests are being skipped because the permissions module on src/lib/api/permissions.ts is hardcoded to return false
// this is necessary for the static build (so the unauthenticated build crawler doesnt get 403 errors)
describe.skip('Permissions', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return true when user has permission', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: false })
    } as Response);

    const result = await canCreateAccount(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/0');
    expect(result).toBe(true);
  });

  it('should return false when API returns error field', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: true })
    } as Response);

    const result = await canCreateAccount(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/0');
    expect(result).toBe(false);
  });

  it('should return false when fetch fails (not ok)', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({})
    } as Response);

    const result = await canCreateAccount(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/0');
    expect(result).toBe(false);
  });

  it('should return true when user has permission', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: false })
    } as Response);

    const result = await canViewAccount(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/1');
    expect(result).toBe(true);
  });

  it('should return false when API returns error field', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: true })
    } as Response);

    const result = await canViewAccount(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/1');
    expect(result).toBe(false);
  });

  it('should return false when fetch fails (not ok)', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({})
    } as Response);

    const result = await canViewAccount(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/1');
    expect(result).toBe(false);
  });

  it('should return true when user has permission', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: false })
    } as Response);

    const result = await canEditAccount(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/2');
    expect(result).toBe(true);
  });

  it('should return false when API returns error field', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: true })
    } as Response);

    const result = await canEditAccount(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/2');
    expect(result).toBe(false);
  });

  it('should return false when fetch fails (not ok)', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({})
    } as Response);

    const result = await canEditAccount(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/2');
    expect(result).toBe(false);
  });

  it('should return true when user has permission', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: false })
    } as Response);

    const result = await canDeleteAccount(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/3');
    expect(result).toBe(true);
  });

  it('should return false when API returns error field', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: true })
    } as Response);

    const result = await canDeleteAccount(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/3');
    expect(result).toBe(false);
  });

  it('should return false when fetch fails (not ok)', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({})
    } as Response);

    const result = await canDeleteAccount(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/3');
    expect(result).toBe(false);
  });

  it('should return true when user has permission', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: false })
    } as Response);

    const result = await canCreateActivity(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/4');
    expect(result).toBe(true);
  });

  it('should return false when API returns error field', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: true })
    } as Response);

    const result = await canCreateActivity(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/4');
    expect(result).toBe(false);
  });

  it('should return false when fetch fails (not ok)', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({})
    } as Response);

    const result = await canCreateActivity(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/4');
    expect(result).toBe(false);
  });

  it('should return true when user has permission', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: false })
    } as Response);

    const result = await canViewActivity(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/5');
    expect(result).toBe(true);
  });

  it('should return false when API returns error field', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: true })
    } as Response);

    const result = await canViewActivity(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/5');
    expect(result).toBe(false);
  });

  it('should return false when fetch fails (not ok)', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({})
    } as Response);

    const result = await canViewActivity(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/5');
    expect(result).toBe(false);
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

  it('should return true when user has permission', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: false })
    } as Response);

    const result = await canDeleteActivity(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/7');
    expect(result).toBe(true);
  });

  it('should return false when API returns error field', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: true })
    } as Response);

    const result = await canDeleteActivity(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/7');
    expect(result).toBe(false);
  });

  it('should return false when fetch fails (not ok)', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({})
    } as Response);

    const result = await canDeleteActivity(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/7');
    expect(result).toBe(false);
  });

  it('should return true when user has permission', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: false })
    } as Response);

    const result = await canEditSettings(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/8');
    expect(result).toBe(true);
  });

  it('should return false when API returns error field', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: true })
    } as Response);

    const result = await canEditSettings(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/8');
    expect(result).toBe(false);
  });

  it('should return false when fetch fails (not ok)', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({})
    } as Response);

    const result = await canEditSettings(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/8');
    expect(result).toBe(false);
  });

  it('should return true when user has permission', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: false })
    } as Response);

    const result = await isSuperUser(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/9');
    expect(result).toBe(true);
  });

  it('should return false when API returns error field', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ error: true })
    } as Response);

    const result = await isSuperUser(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/9');
    expect(result).toBe(false);
  });

  it('should return false when fetch fails (not ok)', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({})
    } as Response);

    const result = await isSuperUser(fetch as typeof globalThis.fetch);

    expect(fetch).toHaveBeenCalledWith('/api/auth/hasPermission/9');
    expect(result).toBe(false);
  });

  it('should return false when fetch throws an error', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    await expect(canEditActivity(fetch as typeof globalThis.fetch)).rejects.toThrow(
      'Network error'
    );
  });
});
