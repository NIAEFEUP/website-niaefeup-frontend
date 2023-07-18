import type { CustomWebsite } from './CustomWebsite';

export type TeamMember = {
  name: string;
  role: string;
  photoPath: string;
  linkedin?: string;
  gitHub?: string;
  customWebsites?: CustomWebsite[];
};
