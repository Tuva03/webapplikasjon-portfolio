export type Project = {
  id: string;
  title: string;
  description: string;
  categories: string[];
  repolink: string;
  publishedAt: Date;
  isPublic: boolean;
  status: boolean;
  tags: string[];
};

export type DbProject = {
  id: string;
  title: string;
  description: string;
  categories: string[];
  repolink: string;
  publishedAt: Date;
  isPublic: boolean;
  status: boolean;
  tags: string[];
};
