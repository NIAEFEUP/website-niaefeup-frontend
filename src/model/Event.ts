import type { DateInterval } from './DateInterval';

export type Event = {
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
