import { z } from "zod";

export const projectsSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  repolink: z.string(),
  publishedAt: z.string().datetime(),
  isPublic: z.boolean(),
  status: z.boolean(),
  tags: z.array(z.string()),
});

export const projectResponseSchema = projectsSchema.extend({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  repolink: z.string(),
  publishedAt: z.string().datetime(),
  isPublic: z.boolean(),
  status: z.boolean(),
  tags: z.array(z.string()),
});

export const updateProjectSchema = projectsSchema.omit({
  publishedAt: true,
});

export const createProjectSchema = projectsSchema.omit({
  id: true,
  publishedAt: true,
});

export type Project = z.infer<typeof projectsSchema>;

export const projectFromDbSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  repolink: z.string(),
  publishedAt: z.string().datetime(),
  isPublic: z.boolean(),
  status: z.boolean(),
  tags: z.array(z.string()),
});

export type ProjectFromDb = z.infer<typeof projectFromDbSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>;

export const validateCreateProject = (data: unknown) => {
  return createProjectSchema.safeParse(data);
};

export const validateUpdateProject = (data: unknown) => {
  return updateProjectSchema.safeParse(data);
};

export const validateProject = (data: unknown) => {
  return projectsSchema.safeParse(data);
};
