/*import { createProjectRepository, type ProjectRepository } from "../repository";
import { ResultHandler } from "@/lib/result";
import { createProject } from "../mappers";
import db from "@/db/db";
import { Result } from "src/types";
import { Project } from "../types";
import { isValidProject } from "../helpers/validators";

export const createProjectService = (projectRepository: ProjectRepository) => {
  const getById = async (id: string): Promise<Result<Project | undefined>> => {
    return projectRepository.getById(id);
  };

  // Henter alle habits
  const list = async (
    query?: Record<string, string>
  ): Promise<Result<Project[]>> => {
    return projectRepository.list(query);
  };

  /*
 const list = async (): Promise<Result<Project[]>> => {
    return projectRepository.list();
  };

  // Oppretter en ny habit
  const create = async (data: CreateProjectDto): Promise<Result<string>> => {
    const project = createProject(data);

    // Validerer habit-dataen
    if (!isValidProject(project)) {
      return ResultHandler.failure("Invalid project data", "BAD_REQUEST");
    }
    return projectRepository.create(project);
  };

  // Oppdaterer en eksisterende habit
  const update = async (data: UpdateProjectDto) => {
    const project = createProject(data);

    // Validerer habit-dataen
    if (!isValidProject(project))
      return ResultHandler.failure("Invalid project data", "BAD_REQUEST");

    return projectRepository.update(project);
  };

  // Publiserer en habit
  const publish = async (id: string) => {
    const result = await projectRepository.getById(id);
    if (!result.success)
      return ResultHandler.failure(result.error.message, result.error.code);
    if (!result.data)
      return ResultHandler.failure("Project not found", "NOT_FOUND");
    // Vet at data nå er en vane
    const project = result.data;
    return projectRepository.update({ ...project, publishedAt: new Date() });
  };

  // Sletter en habit
  const remove = async (id: string) => {
    return projectRepository.remove(id);
  };

  // Returnerer et objekt med alle service-metodene
  return { list, create, update, getById, remove, publish };
};

// Oppretter en instans av habit-servicen med et repository
export const projectService = createProjectService(createProjectRepository(db));

// Definerer typen for habit-servicen
export type ProjectService = ReturnType<typeof createProjectService>;
*/

import { projectRepository, type ProjectRepository } from "../repository/index";

import {
  validateCreateProject,
  type CreateProject,
  type Project,
  type ProjectResponse,
  type UpdateProject,
} from "../helpers/index";

import { createProject, createProjectResponse } from "../mappers/index";
import { Result } from "src/types";
import { Query } from "src/lib/query";

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
