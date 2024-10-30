import { Project, ProjectFromDb, ProjectResponse } from "../helpers";

const createId = () => {
  return crypto.randomUUID();
};

export const createProjectResponse = (project: Project): ProjectResponse => {
  const { title } = project;

  return {
    ...project,
  };
};

export const fromDb = (project: ProjectFromDb) => {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    categories: project.categories,
    repolink: project.repolink,
    publishedAt: new Date(project.publishedAt).toISOString(),
    isPublic: project.isPublic,
    status: project.status,
    tags: project.tags,
  };
};

export const createProject = (project: Partial<Project>): Project => {
  return {
    id: project.id ?? createId(),
    title: project.title ?? "",
    description: project.description ?? "",
    categories: project.categories ?? [],
    repolink: project.repolink ?? "",
    publishedAt: project.publishedAt ?? new Date().toISOString(),
    isPublic: project.isPublic ?? false,
    status: project.status ?? false,
    tags: project.tags ?? [],
  };
};

export const toDb = (data: Partial<Project>) => {
  const project = createProject(data);

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    categories: project.categories,
    repolink: project.repolink,
    publishedAt: project.publishedAt,
    isPublic: project.isPublic,
    status: project.status,
    tags: project.tags,
  };
};
