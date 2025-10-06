import type { TeamMember } from './team-member';

export type GenerationSection = {
  section: string;
  accounts: TeamMember[];
};

export type Generation = GenerationSection[];
