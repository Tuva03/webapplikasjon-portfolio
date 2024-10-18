import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  beskrivelse: z.string(),
  repo_link: z.string(),
});

export const ProjectCreateSchema = ProjectSchema.omit({ title: true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;
