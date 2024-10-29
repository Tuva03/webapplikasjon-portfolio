import { z } from "zod";

export { projectSchema, projectsSchema };

const projectSchema = z.object({
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

const projectsSchema = z.array(projectSchema);

export function validateProject(data: unknown) {
  return projectSchema.safeParse(data);
}
