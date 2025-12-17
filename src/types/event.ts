import type { DateInterval } from './date-interval.ts';
import type { TeamMember } from './team-member.ts';

export type Event = {
  image: string | null | undefined;
  teamMembers: TeamMember[];
  gallery: string[] | undefined;
  title: string;
  description: string;
  registerUrl: string;
  dateInterval: DateInterval;
  location?: string;
  category?: string;
  thumbnailPath: string;
  slug?: string;
};
