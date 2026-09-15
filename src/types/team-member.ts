import type { CustomWebsite } from './custom-website';
import type { Role } from './role';

export type TeamSection = {
  id: string;
  name: string;
  accounts: TeamMember[];
};

export type TeamMember = {
  id: string | number;
  name: string;
  email?: string;
  bio?: string;
  birthDate?: string;
  roles?: Role[];
  isActive?: boolean;
  photo?: string;
  linkedin?: string;
  github?: string;
  websites?: CustomWebsite[];
};
