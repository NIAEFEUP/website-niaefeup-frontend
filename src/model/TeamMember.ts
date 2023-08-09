import type { CustomWebsite } from './CustomWebsite';

export type TeamMember = {
  name: string;
  email: string;
  role: string;
  photo?: string;
  linkedin?: string;
  gitHub?: string;
  websites?: CustomWebsite[];
};
