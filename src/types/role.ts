import type { PerActivityRole } from '@/types/peractivityrole.ts';

export type Role = {
  name: string;
  permissions: string[];
  isSection: boolean;
  id: number;
  associatedActivities: PerActivityRole[];
};
