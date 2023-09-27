import { describe, it, expect } from 'vitest';
import { endpoint } from './proxy';

describe('API proxy', () => {
  it("should return pathname without '/api'", () => {
    const url = new URL('https://localhost/api');
    expect(endpoint(url)).toBe('');
  });

  it("should return pathname without '/api/'", () => {
    const url = new URL('https://localhost/api/test');
    expect(endpoint(url)).toBe('test');
  });

  it("should return pathname without '/api/' and maintain other slashes", () => {
    const url = new URL('https://localhost/api/test/new');
    expect(endpoint(url)).toBe('test/new');
  });
});
