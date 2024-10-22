import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  repolink: z.string(),
  publishedAt: z.string().datetime(),
  public: z.boolean(),
  status: z.boolean(),
  tags: z.array(z.string()),
});

export const ProjectCreateSchema = ProjectSchema.omit({ title: true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;
