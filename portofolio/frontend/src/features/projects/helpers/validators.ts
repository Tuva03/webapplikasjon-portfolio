import { z } from "zod";

export { projectSchema, projectsSchema };

const projectSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  beskrivelse: z.string(),
  categories: z.array(z.string()),
  repo_link: z.string(),
  publishedAt: z.string().datetime(),
});

const projectsSchema = z.array(projectSchema);

//export function validateProject(data: unknown) {
//  return projectSchema.safeParse(data);
//}
