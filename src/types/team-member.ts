import type { CustomWebsite } from './custom-website';

export type TeamMember = {
  id: number;
  name: string;
  email: string;
  bio: string;
  birthDate: Date;
  role: string;
  isActive?: boolean;
  photo?: string;
  linkedin?: string;
  github?: string;
  websites?: CustomWebsite[];
};
