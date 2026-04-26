export function fileIdentityKey(file: File): string {
  return `${file.name}\0${file.size}\0${file.lastModified}`;
}

export function isAcceptedFileType(file: File, accept: string): boolean {
  const tokens = accept
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (tokens.length === 0) return true;
  if (
    tokens.includes('image/*') &&
    (!file.type || file.type === 'application/octet-stream') &&
    /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(file.name)
  ) {
    return true;
  }
  for (const token of tokens) {
    if (token === 'image/*' && file.type.startsWith('image/')) return true;
    if (token.endsWith('/*')) {
      const prefix = token.slice(0, -1);
      if (file.type.startsWith(prefix)) return true;
    } else if (token.startsWith('.')) {
      if (file.name.toLowerCase().endsWith(token.toLowerCase())) return true;
    } else if (file.type === token) return true;
  }
  return false;
}

export type ProcessAppendFilesResult =
  | { outcome: 'max_files' }
  | {
      outcome: 'ok';
      vetted: File[];
      hadTypeReject: boolean;
      hadSizeReject: boolean;
    };

export function processAppendFiles(params: {
  newFiles: File[];
  value: (string | File)[];
  accept: string;
  maxFiles: number;
  maxFileSizeBytes: number;
}): ProcessAppendFilesResult {
  const { newFiles, value, accept, maxFiles, maxFileSizeBytes } = params;

  const existingKeys = new Set(
    value.filter((f): f is File => f instanceof File).map(fileIdentityKey)
  );
  const seenInSelection = new Set<string>();
  const uniqueNew = newFiles.filter((file) => {
    const key = fileIdentityKey(file);
    if (existingKeys.has(key) || seenInSelection.has(key)) return false;
    seenInSelection.add(key);
    return true;
  });

  const slotsLeft = maxFiles - value.length;
  if (slotsLeft <= 0) {
    return { outcome: 'max_files' };
  }

  let hadTypeReject = false;
  let hadSizeReject = false;
  const vetted: File[] = [];
  for (const file of uniqueNew) {
    if (vetted.length >= slotsLeft) break;
    if (!isAcceptedFileType(file, accept)) {
      hadTypeReject = true;
      continue;
    }
    if (file.size > maxFileSizeBytes) {
      hadSizeReject = true;
      continue;
    }
    vetted.push(file);
  }

  return { outcome: 'ok', vetted, hadTypeReject, hadSizeReject };
}

export function getFileDisplayName(file: string | File): string {
  if (file instanceof File) return file.name;
  const tail = file.split('/').pop();
  return tail ?? file;
}
