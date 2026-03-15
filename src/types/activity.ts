import type {Account} from "@/types/account.ts"

export type Activity = {
  id: number;
  title: string;
  description: string;
  teamMembers: Account[];
  slug: string;
  image: string;
  gallery: string[];
};