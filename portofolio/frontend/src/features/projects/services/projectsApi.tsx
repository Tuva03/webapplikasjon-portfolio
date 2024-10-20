import { ofetch } from "ofetch";
import { baseUrl, endpoints } from "../../../config/urls";
import { projectsSchema } from "../helpers/validators";

const list = async () => {
  try {
    const projects = await ofetch(endpoints.projects);
    console.log(projectsSchema.safeParse(projects.data)); // Se feilene
    return projectsSchema.parse(projects.data);
  } catch (error) {
    console.error(error);
  }
};

export default { list };
