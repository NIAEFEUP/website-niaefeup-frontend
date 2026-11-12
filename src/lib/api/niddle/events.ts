import { env } from '$env/dynamic/public';
import fallbackEvents from '$lib/data/api/events/list.json';
import type { DateInterval } from '@/types/date-interval';
import type { Event } from '@/types/event';
import type { NiddleEvent, NiddlePaginatedResponse } from '@/types/niddle';

const PAGE_LIMIT = 100; // max allowed by NIddle
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
