// Types for the NIddle API responses (https://github.com/NIAEFEUP/NIddle).
// They mirror the entities and DTOs in NIddle's `apps/api/src`.

export type NiddleAssociation = {
  id: string;
  name: string;
  acronym?: string | null;
};

export type NiddleFaculty = {
  id: string;
  name: string;
  acronym: string;
};

export type NiddleCourse = {
  id: string;
  name: string;
  acronym: string;
};

export type NiddleEvent = {
  id: string;
  name: string;
  description?: string | null;
  year: number;
  // ISO 8601 date strings. Single-day events only have `startDate`;
  // "until" events only have `endDate`; TBD events have neither.
  startDate?: string | null;
  endDate?: string | null;
  faculty?: NiddleFaculty | null;
  courses?: NiddleCourse[];
  createdBy?: NiddleAssociation;
};

export type NiddlePaginationMeta = {
  page: number;
  limit: number;
  itemCount: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type NiddlePaginatedResponse<T> = {
  data: T[];
  meta: NiddlePaginationMeta;
};
