import type { CustomWebsite } from './custom-website';

export type Project = {
  title: string;
  description: string;
  slug: string;
  image: string;
  gallery: string[];
  thumbnail: string;
  technologies: string;
  slogan: string;
  targetAudience: string;
  github: string;
  links: CustomWebsite[];
};
