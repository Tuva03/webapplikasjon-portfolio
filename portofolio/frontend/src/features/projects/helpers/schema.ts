import { z } from "zod";

export { projectSchema, projectsSchema };

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  beskrivelse: z.string(),
  repo_link: z.string(),
});

const projectsSchema = z.array(projectSchema);

export function validateProject(data: unknown) {
  return projectSchema.safeParse(data);
}
