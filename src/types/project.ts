import type { CustomWebsite } from './custom-website';
import type { TimelineEvent } from './timeline-event';

export type Project = {
  title: string;
  description: string;
  teamMemberIds: bigint[];
  slug: string;
  image: string;
  gallery: string[];
  thumbnail: string;
  isArchived: boolean;
  technologies: string[];
  slogan: string;
  targetAudience: string;
  github: string;
  links: CustomWebsite[];
  hallOfFame: bigint[];
  timeline: TimelineEvent[];
};
