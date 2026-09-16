import type { Technology } from './technology';
import type { CustomWebsite } from './custom-website';
import type { TimelineEvent } from './timeline-event';
import type { TeamMember } from './team-member';

export type Project = {
  title: string;
  description: string;
  teamMembers: TeamMember[];
  slug: string;
  image: string;
  gallery: string[];
  thumbnail: string;
  isArchived: boolean;
  technologies: Technology[];
  slogan: string;
  targetAudience: string;
  github: string;
  links: CustomWebsite[];
  hallOfFame: TeamMember[];
  timeline: TimelineEvent[];
};
