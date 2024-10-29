import { ofetch } from "ofetch";
import { endpoints } from "../../../config/urls";
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
      console.log("Validation failed:", projects.error?.issues); // Log specific issues
      return { data: [] };
    }

    return { data: projects.data };
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
};

export default { list };

/*
import {
  validateCreateProject,
  type CreateProject,
  type Project,
  type ProjectResponse,
  type UpdateProject,
} from "../../../../../backend/src/features/projects/helpers";

export const createProjectService = (projectRepository: ProjectRepository) => {
  const getById = async (id: string): Promise<Result<Project | undefined>> => {
    return projectRepository.getById(id);
  };

  const list = async (query?: Query): Promise<Result<ProjectResponse[]>> => {
    const result = await projectRepository.list(query);
    if (!result.success) return result;

    return {
      ...result,
      data: result.data.map(createProjectResponse),
    };
  };

  const create = async (data: CreateProject): Promise<Result<string>> => {
    const project = createProject(data);

    if (!validateCreateProject(project).success) {
      return {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid project data" },
      };
    }
    return projectRepository.create(project);
  };

  const update = async (data: UpdateProject) => {
    const project = createProject(data);

    if (!validateCreateProject(project).success) {
      return {
        success: false,
        error: { code: "BAD_REQUEST", message: "Invalid project data" },
      };
    }

    return projectRepository.update(project);
  };

  const remove = async (id: string) => {
    return projectRepository.remove(id);
  };

  return {
    list,
    create,
    update,
    getById,
    remove,
  };
};

export const projectService = createProjectService(projectRepository);

export type ProjectService = ReturnType<typeof createProjectService>;
*/
