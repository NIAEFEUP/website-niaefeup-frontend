import type { NiddleEvent, NiddlePaginatedResponse } from '@/types/niddle';

const PAGE_LIMIT = 100; // max allowed by NIddle
const REQUEST_TIMEOUT_MS = 5000;

type NiddleConfig = {
  apiUrl: string;
  associationId: string;
};

function isPaginatedResponse(body: unknown): body is NiddlePaginatedResponse<NiddleEvent> {
  if (typeof body !== 'object' || body === null) return false;
  const { data, meta } = body as Partial<NiddlePaginatedResponse<NiddleEvent>>;
  return Array.isArray(data) && typeof meta === 'object' && meta !== null;
}

/**
 * Fetches every event created by the configured association from NIddle,
 * following the pagination until the last page. Throws on any failure.
 */
export async function fetchNiddleEvents(
  config: NiddleConfig,
  fetch: typeof globalThis.fetch = globalThis.fetch
): Promise<NiddleEvent[]> {
  const events: NiddleEvent[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_LIMIT),
      createdById: config.associationId,
      sortBy: 'startDate',
      sortOrder: 'DESC'
    });

    const res = await fetch(`${config.apiUrl}/api/events?${params}`, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    });
    if (!res.ok) {
      throw new Error(`NIddle responded with ${res.status} ${res.statusText}`);
    }

    const body: unknown = await res.json();
    if (!isPaginatedResponse(body)) {
      throw new Error('Unexpected response shape from NIddle');
    }

    events.push(...body.data);
    hasNextPage = body.meta.hasNextPage === true;
    page++;
  }

  return events;
}
