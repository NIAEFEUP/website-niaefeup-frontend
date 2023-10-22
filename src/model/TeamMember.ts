import type { CustomWebsite } from './CustomWebsite';

export type TeamMember = {
  name: string;
  email: string;
  bio: string;
  birthDate: string;
  photo?: string;
  linkedin?: string;
  github?: string;
  websites?: CustomWebsite[];
  id: number;
};
