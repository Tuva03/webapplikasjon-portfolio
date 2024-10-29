/*import { Entries } from "src/types";
import type { DbProject, Project } from "../types";
import { createId } from "@/lib/id";

// Konverterer en database-representasjon til en applikasjonsmodell
export const fromDb = (project: DbProject) => {
  return {
    id: project.id,
    title: project.title,
    // Konverterer streng-datoer til Date-objekter
    description: project.description,
    // Splitter kommaseparert streng til array
    categories: project.categories.split(","),
    repolink: project.repolink,
    // Håndterer nullable felter
    publishedAt: project.publishedAt ? new Date(project.publishedAt) : null,
    isPublic: project.isPublic,
    status: project.status,
    tags: project.tags.split(","),
  };
};

// ... fromDB

// Oppretter en ny vane-instans med standardverdier
// Bruker partial da vi ikke krever alle verdier
export const createProject = (project: Partial<Project>): Project => {
  return {
    // Bruker nullish coalescing (??) for å sette standardverdier
    id: project.id ?? createId(),
    title: project.title ?? "",
    description: project.description ?? "",
    categories: project.categories ?? [],
    repolink: project.repolink ?? "",
    publishedAt: project.publishedAt ?? new Date(),
    isPublic: project.isPublic ?? false,
    status: project.status ?? false,
    tags: project.tags ?? [],
  };
};

export const toDb = (data: Project) => {
  // Sikrer at alle nødvendige felter er satt
  const project = createProject(data);
  // Caster Object.entries for type-sikkerhet
  const entries = Object.entries(project) as Entries<Project>;
  const DbProject = {} as DbProject;

  // Itererer over alle felter i vanen
  for (const entry of entries) {
    if (!entry) continue;
    const [key, value] = entry;
    switch (key) {
      case "id":
        DbProject.id = value;
        break;
      case "title":
        DbProject.title = value;
        break;
      case "description":
        DbProject.description = value;
        break;
      case "categories":
        // Konverterer array til kommaseparert streng
        DbProject.categories = value?.join(",");
        break;
      case "repolink":
        DbProject.repolink = value;
        break;
      case "publishedAt":
        // Konverterer Date-objekter til ISO-strenger
        DbProject.publishedAt =
          value instanceof Date ? value.toISOString() : null;
        break;
      case "isPublic":
        DbProject.isPublic = value ? true : false;
        break;
      case "status":
        DbProject.status = value ? true : false;
        break;
      case "tags":
        // Konverterer array til kommaseparert streng
        DbProject.tags = value?.join(",");
        break;
      default:
        break;
    }
  }
  return DbProject;
};
*/
import { Project } from "types";
import { ProjectFromDb, ProjectResponse } from "../helpers";

const createId = () => {
  return crypto.randomUUID();
};

export const createProjectResponse = (project: Project): ProjectResponse => {
  const { title } = project;
  //  const [firstName, ...rest] = name.split(" ");

  return {
    ...project,
  };
};

export const fromDb = (project: ProjectFromDb) => {
  return {
    //updatedAt: new Date(student.updated_at).toISOString(),

    id: project.id,
    title: project.title,
    description: project.description,
    categories: project.categories,
    repolink: project.repolink,
    publishedAt: new Date(project.publishedAt).toISOString(),
    isPublic: project.isPublic,
    status: project.status,
    tags: project.tags,
  };
};

export const createProject = (project: Partial<Project>): Project => {
  return {
    id: project.id ?? createId(),
    title: project.title ?? "",
    description: project.description ?? "",
    categories: project.categories ?? [],
    repolink: project.repolink ?? "",
    publishedAt: project.publishedAt ?? new Date().toISOString(),
    isPublic: project.isPublic ?? false,
    status: project.status ?? false,
    tags: project.tags ?? [],
  };
};

export const toDb = (data: Partial<Project>) => {
  const project = createProject(data);

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    categories: project.categories,
    repolink: project.repolink,
    publishedAt: project.publishedAt,
    isPublic: project.isPublic,
    status: project.status,
    tags: project.tags,
  };
};
