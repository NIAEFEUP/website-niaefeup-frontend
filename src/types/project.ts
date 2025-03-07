export type Project = {
  title: string;
  description: string;
  teamMemberIds: bigint[];
  // associatedRoles : ?;
  slug: string;
  image: string;
  gallery: string[];
  thumbnail: string;
  isArchived: boolean;
  technologies: string[];
  slogan: string;
  targetAudience: string;
  github: string;
  // links : ?;
  // hallOfFame: ?;
  // timeline : ?;
};
