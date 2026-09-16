import type { Activity } from '@/types/activity.ts';

export type PerActivityRole = {
  id: number;
  permissions: string[];
  activity: Activity;
};
