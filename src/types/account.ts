import type { CustomWebsite } from '@/types/custom-website';

export type Account = {
  id: number;
  name: string;
  email: string;
  bio?: string | null;
  birthDate?: string | null;
  photo?: string | null;
  linkedin?: string | null;
  github?: string | null;
  websites: CustomWebsite[];
  isActive: boolean;
};
