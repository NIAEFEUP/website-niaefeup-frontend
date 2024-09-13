import type { TeamMember } from './team-member';

export type Event = {
  title: string;
  description: string;
  teamMembers: TeamMember[];
  slug: string;
  image: string;
  registerUrl: string;
  dateInterval: {
    startDate: string;
    endDate: string;
  };
  location: string;
  category: string;
  id: number;
};
