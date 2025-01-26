import type { CustomWebsite } from './custom-website';

export type TeamMember = {
  name: string;
  email: string;
  bio: string;
  birthDate: Date,
  role: string;
  photo?: string;
  linkedin?: string;
  github?: string;
  websites?: CustomWebsite[];
};
