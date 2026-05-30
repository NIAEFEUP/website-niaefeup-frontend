import type { CustomWebsite } from './custom-website';
import type { Role } from './role';

export type TeamMember = {
  name: string;
  email: string;
  bio: string;
  birthDate: Date;
  roles?: Role[];
  isActive?: boolean;
  photo?: string;
  linkedin?: string;
  github?: string;
  websites?: CustomWebsite[];
};
