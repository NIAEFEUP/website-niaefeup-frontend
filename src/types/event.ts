import type { DateInterval } from './date-interval.ts';

export type Event = {
  image: string | null | undefined;
  teamMembers: never[];
  gallery: string[] | undefined;
  title: string;
  description: string;
  teamMemberIds: bigint[];
  registerUrl: string;
  dateInterval: DateInterval;
  location?: string;
  category?: string;
  thumbnailPath: string;
  slug?: string;
};
