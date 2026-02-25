import { writable } from 'svelte/store';

export const isGlobalLoading = writable(false);

export async function loadingWrapper<T>(promise: Promise<T>): Promise<T> {
  isGlobalLoading.set(true);
  try {
    return await promise;
  } finally {
    isGlobalLoading.set(false);
  }
}
