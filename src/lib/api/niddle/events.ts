import { env } from '$env/dynamic/public';
import fallbackEvents from '$lib/data/api/events/list.json';
import type { DateInterval } from '@/types/date-interval';
import type { Event } from '@/types/event';
import type { NiddleEvent, NiddlePaginatedResponse } from '@/types/niddle';

const PAGE_LIMIT = 100; // max allowed by NIddle
const MAX_PAGES = 20; // safety bound: up to 2000 events
const REQUEST_TIMEOUT_MS = 5000;

type NiddleConfig = {
  apiUrl: string;
  associationId: string;
};

function getNiddleConfig(): NiddleConfig | null {
  const apiUrl = env.PUBLIC_NIDDLE_API_URL?.trim().replace(/\/+$/, '');
  const associationId = env.PUBLIC_NIDDLE_ASSOCIATION_ID?.trim();
  if (!apiUrl || !associationId) return null;
  return { apiUrl, associationId };
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isOptionalString = (value: unknown): boolean =>
  value === undefined || value === null || typeof value === 'string';

// Only checks the fields used by `mapNiddleEvent`.
function isNiddleEvent(value: unknown): value is NiddleEvent {
  return (
    isObject(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    isOptionalString(value.description) &&
    isOptionalString(value.startDate) &&
    isOptionalString(value.endDate)
  );
}

function isPaginatedResponse(body: unknown): body is NiddlePaginatedResponse<NiddleEvent> {
  return (
    isObject(body) &&
    Array.isArray(body.data) &&
    body.data.every(isNiddleEvent) &&
    isObject(body.meta) &&
    typeof body.meta.hasNextPage === 'boolean'
  );
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
    if (page > MAX_PAGES) {
      throw new Error(`NIddle pagination exceeded ${MAX_PAGES} pages`);
    }

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

    if (body.data.length === 0 && body.meta.hasNextPage) {
      throw new Error('NIddle returned an empty page but reported more pages');
    }

    events.push(...body.data);
    hasNextPage = body.meta.hasNextPage;
    page++;
  }

  return events;
}

function toDateInterval(event: NiddleEvent): DateInterval | undefined {
  // Single-day events only have startDate and "until" events only have endDate,
  // so the missing side reuses the other one. TBD events have neither.
  const startDate = event.startDate ?? event.endDate;
  const endDate = event.endDate ?? event.startDate;
  if (!startDate || !endDate) return undefined;
  return { startDate, endDate };
}

/**
 * Converts a NIddle event into the website's `Event` shape.
 * NIddle has no image, location or category, so those are left empty.
 */
export function mapNiddleEvent(event: NiddleEvent): Event {
  return {
    title: event.name,
    description: event.description ?? '',
    slug: event.id,
    image: null,
    dateInterval: toDateInterval(event)
  };
}

/**
 * Returns the NI events from NIddle, falling back to the local JSON
 * (`src/lib/data/api/events/list.json`) when NIddle is not configured,
 * unreachable, returns an error or has no events. Never throws.
 */
export async function getEvents(
  fetch: typeof globalThis.fetch = globalThis.fetch
): Promise<Event[]> {
  const config = getNiddleConfig();
  if (!config) {
    console.warn(
      '[NIddle] PUBLIC_NIDDLE_API_URL or PUBLIC_NIDDLE_ASSOCIATION_ID not set, using local events'
    );
    return fallbackEvents;
  }

  try {
    const events = await fetchNiddleEvents(config, fetch);
    if (events.length === 0) {
      console.warn('[NIddle] No events returned, using local events');
      return fallbackEvents;
    }
    return events.map(mapNiddleEvent);
  } catch (error) {
    console.warn('[NIddle] Failed to fetch events, using local events:', error);
    return fallbackEvents;
  }
}
