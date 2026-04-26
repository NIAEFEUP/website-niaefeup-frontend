import { describe, it, expect } from 'vitest';
import {
  fileIdentityKey,
  getFileDisplayName,
  isAcceptedFileType,
  processAppendFiles
} from './file-input-logic';

describe('fileIdentityKey', () => {
  it('combines name, size, and lastModified', () => {
    const a = new File(['a'], 'x.png', { type: 'image/png', lastModified: 100 });
    const b = new File(['aa'], 'x.png', { type: 'image/png', lastModified: 100 });
    expect(fileIdentityKey(a)).not.toBe(fileIdentityKey(b));
  });

  it('is stable for the same file metadata', () => {
    const f = new File(['x'], 'y.jpg', { type: 'image/jpeg', lastModified: 42 });
    expect(fileIdentityKey(f)).toBe(fileIdentityKey(f));
  });
});

describe('getFileDisplayName', () => {
  it('returns File.name for File instances', () => {
    expect(getFileDisplayName(new File([], 'doc.pdf'))).toBe('doc.pdf');
  });

  it('returns the last path segment for URL-like strings', () => {
    expect(getFileDisplayName('https://example.com/a/b/c.png')).toBe('c.png');
  });
});

describe('isAcceptedFileType', () => {
  it('accepts any file when accept is empty after parsing', () => {
    const f = new File(['x'], 'anything.bin', { type: 'application/octet-stream' });
    expect(isAcceptedFileType(f, '  ,  ,')).toBe(true);
  });

  it('accepts image/* when MIME is image/', () => {
    const f = new File(['x'], 'a', { type: 'image/webp' });
    expect(isAcceptedFileType(f, 'image/*')).toBe(true);
  });

  it('accepts image/* for octet-stream when extension looks like an image', () => {
    const f = new File(['x'], 'photo.JPEG', { type: 'application/octet-stream' });
    expect(isAcceptedFileType(f, 'image/*')).toBe(true);
  });

  it('accepts image/* for empty type when extension looks like an image', () => {
    const f = new File(['x'], 'x.png', { type: '' });
    expect(isAcceptedFileType(f, 'image/*')).toBe(true);
  });

  it('rejects non-images for image/* when type and extension do not match', () => {
    const f = new File(['x'], 'notes.txt', { type: 'text/plain' });
    expect(isAcceptedFileType(f, 'image/*')).toBe(false);
  });

  it('accepts token type/* via MIME prefix', () => {
    const f = new File(['x'], 'v.webm', { type: 'video/webm' });
    expect(isAcceptedFileType(f, 'video/*')).toBe(true);
  });

  it('accepts extension tokens', () => {
    const f = new File(['x'], 'Archive.ZIP', { type: '' });
    expect(isAcceptedFileType(f, '.zip')).toBe(true);
  });

  it('accepts exact MIME match', () => {
    const f = new File(['x'], 'x', { type: 'application/pdf' });
    expect(isAcceptedFileType(f, 'application/pdf')).toBe(true);
  });
});

describe('processAppendFiles', () => {
  const accept = 'image/*';
  const maxFileSizeBytes = 100;
  const maxFiles = 3;

  it('returns max_files when there is no room left', () => {
    const existing = [
      new File(['1'], 'a.png', { type: 'image/png' }),
      new File(['2'], 'b.png', { type: 'image/png' }),
      new File(['3'], 'c.png', { type: 'image/png' })
    ];
    const next = new File(['4'], 'd.png', { type: 'image/png' });
    const result = processAppendFiles({
      newFiles: [next],
      value: existing,
      accept,
      maxFiles,
      maxFileSizeBytes: 10_000
    });
    expect(result).toEqual({ outcome: 'max_files' });
  });

  it('deduplicates files already in value', () => {
    const existingFile = new File(['x'], 'same.png', { type: 'image/png', lastModified: 1 });
    const duplicate = new File(['y'], 'same.png', { type: 'image/png', lastModified: 1 });
    const result = processAppendFiles({
      newFiles: [duplicate],
      value: [existingFile],
      accept,
      maxFiles,
      maxFileSizeBytes: 10_000
    });
    expect(result.outcome).toBe('ok');
    if (result.outcome === 'ok') {
      expect(result.vetted).toHaveLength(0);
      expect(result.hadTypeReject).toBe(false);
      expect(result.hadSizeReject).toBe(false);
    }
  });

  it('deduplicates duplicates within the same selection', () => {
    const f = new File(['x'], 'one.png', { type: 'image/png', lastModified: 5 });
    const result = processAppendFiles({
      newFiles: [f, f],
      value: [],
      accept,
      maxFiles,
      maxFileSizeBytes: 10_000
    });
    expect(result.outcome).toBe('ok');
    if (result.outcome === 'ok') {
      expect(result.vetted).toHaveLength(1);
    }
  });

  it('reports type rejection and does not include rejected files', () => {
    const bad = new File(['x'], 'x.txt', { type: 'text/plain' });
    const result = processAppendFiles({
      newFiles: [bad],
      value: [],
      accept,
      maxFiles,
      maxFileSizeBytes: 10_000
    });
    expect(result.outcome).toBe('ok');
    if (result.outcome === 'ok') {
      expect(result.vetted).toHaveLength(0);
      expect(result.hadTypeReject).toBe(true);
      expect(result.hadSizeReject).toBe(false);
    }
  });

  it('reports size rejection', () => {
    const big = new File([new Uint8Array(maxFileSizeBytes + 1)], 'big.png', {
      type: 'image/png'
    });
    const result = processAppendFiles({
      newFiles: [big],
      value: [],
      accept,
      maxFiles,
      maxFileSizeBytes
    });
    expect(result.outcome).toBe('ok');
    if (result.outcome === 'ok') {
      expect(result.vetted).toHaveLength(0);
      expect(result.hadTypeReject).toBe(false);
      expect(result.hadSizeReject).toBe(true);
    }
  });

  it('vettes acceptable files up to slotsLeft', () => {
    const a = new File(['a'], 'a.png', { type: 'image/png' });
    const b = new File(['b'], 'b.png', { type: 'image/png' });
    const c = new File(['c'], 'c.png', { type: 'image/png' });
    const result = processAppendFiles({
      newFiles: [a, b, c],
      value: [new File(['0'], 'z.png', { type: 'image/png' })],
      accept,
      maxFiles: 3,
      maxFileSizeBytes: 10_000
    });
    expect(result.outcome).toBe('ok');
    if (result.outcome === 'ok') {
      expect(result.vetted.map((f) => f.name)).toEqual(['a.png', 'b.png']);
    }
  });

  it('ignores string entries in value when deduplicating (only Files have keys)', () => {
    const url = 'https://example.com/existing.png';
    const newFile = new File(['x'], 'existing.png', { type: 'image/png', lastModified: 0 });
    const result = processAppendFiles({
      newFiles: [newFile],
      value: [url],
      accept,
      maxFiles,
      maxFileSizeBytes: 10_000
    });
    expect(result.outcome).toBe('ok');
    if (result.outcome === 'ok') {
      expect(result.vetted).toHaveLength(1);
    }
  });
});
