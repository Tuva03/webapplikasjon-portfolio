export type Project = {
  id: string;
  title: string;
  description: string;
  categories: string | string[];
  repolink: string;
  publishedAt: Date | null;
  isPublic: boolean;
  status: boolean;
  tags: string | string[];
};

export type DbProject = {
  id: string;
  title: string;
  description: string;
  categories: string | string[];
  repolink: string;
  publishedAt: Date | null;
  isPublic: boolean;
  status: boolean;
  tags: string | string[];
};
