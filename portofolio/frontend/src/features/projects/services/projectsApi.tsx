import { ofetch } from "ofetch";
import { baseUrl, endpoints } from "../../../config/urls";
import { ProjectProps as Project } from "../../../components/Types";
import { validateProject } from "../../../../../backend/src/features/projects/helpers/index";
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
    // Henter alle vaner
    const projectData = await ofetch(endpoints.projects, {
      credentials: "include",
      //retry: 0,
    });

    console.log("Fetched data:", projectData); // Log the raw data

    const projects = validateProject(projectData);

    if (!projects.success) {
      console.log("Validation failed:", projects); // Log validation result if it fails
      return { data: [] };
    }

    return { data: projects.data };
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
};

export default { list };
