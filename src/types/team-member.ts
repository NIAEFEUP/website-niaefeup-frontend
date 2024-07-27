import type { CustomWebsite } from './custom-website';

export type TeamMember = {
  name: string;
  email: string;
  role: string;
  photo?: string;
  linkedin?: string;
  gitHub?: string;
  websites?: CustomWebsite[];
};
