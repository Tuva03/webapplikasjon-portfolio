import { ofetch } from "ofetch";
import { endpoints } from "../../../config/urls";
import { ProjectProps as Project } from "../../../components/Types";
import { projectsSchema } from "../../../../../backend/src/features/projects/helpers/index";
import { z } from "zod";

/*
const list = async () => {
  try {
    const projects = await ofetch(endpoints.projects);
    console.log(projectsSchema.safeParse(projects.data)); // Se feilene
    return projectsSchema.parse(projects.data);
  } catch (error) {
    console.error(error);
  }
};
*/

const list = async (): Promise<{
  data: Project[];
}> => {
  try {
    const projectData = await ofetch(endpoints.projects, {
      credentials: "include",
    });

    console.log("Fetched data:", projectData); // Log the raw data

    const projectsArray = projectData.projects;

    const validation = z.array(projectsSchema).safeParse(projectsArray);

    if (!validation.success) {
      console.log("Validation failed:", validation); // Log validation result if it fails
      return { data: [] };
    }

    return { data: validation.data };
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
};

export default { list };
