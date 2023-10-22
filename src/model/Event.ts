import type { TeamMember } from './TeamMember';

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
