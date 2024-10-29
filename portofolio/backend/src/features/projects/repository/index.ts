/*
import { ResultHandler } from "@/lib/result";
import { DB } from "src/db/db";
import { Result } from "src/types";
import { fromDb, toDb } from "../mappers";
import { Project } from "types";
import { DbProject } from "../types";

export const createProjectRepository = (db: DB) => {
  const exist = async (id: string): Promise<boolean> => {
    const query = db.prepare(
      "SELECT COUNT(*) as count FROM projects WHERE id = ?"
    );
    const data = query.get(id) as { count: number };
    return data.count > 0;
  };

  const getById = async (id: string): Promise<Result<Project | undefined>> => {
    try {
      const project = await exist(id);
      if (!project)
        return ResultHandler.failure("Project not found", "NOT_FOUND");
      const query = db.prepare("SELECT * FROM projects WHERE id = ?");
      const data = query.get(id) as DbProject;
      // TODO: validering av Project med Zod kan legges til her
      // Konverterer fra databaseformat til applikasjonsformat
      return ResultHandler.success(fromDb(data));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const list = async (): Promise<Result<Project[]>> => {
    try {
      const query = db.prepare("SELECT * FROM projects");
      const data = query.all() as DbProject[];
      // Mapper alle vaner fra databaseformat til applikasjonsformat
      return ResultHandler.success(data.map((project) => fromDb(project)));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  /*
// habitRepository - enklere versjon
const listByUser = async (
    userId: string,
    queryParams?: Record<string, string>,
  ): Promise<Result<Habit[]>> => {
    try {
      let q = `SELECT * FROM habits WHERE user_id = ?`;
      const params: string[] = [userId];
  
      // Håndterer query-parametre
      if (queryParams) {
        if ("categories" in queryParams) {
          // Henter ut kategorier og legger til i query
          const categories = queryParams.categories.split(",");
          // Lager placeholders for hver kategori
          const placeholders = categories.map(() => "?").join(",");
          // Legger til i query og params
          q += ` AND categories IN (${placeholders})`;
          // Legger til kategoriene i params
          params.push(...categories);
        }
  
        // Håndterer publisert dato
        if ("published" in queryParams) {
          q += ` AND date(published) = date(?)`;
          params.push(queryParams.published);
        }
  
        // Håndterer tittel
        if ("title" in queryParams) {
          q += ` AND title LIKE ?`;
          params.push(`%${queryParams.title}%`);
        }
      }
  
      // Kjører query
      const query = db.prepare(q);
      // Henter ut data
      const data = query.all(...params) as DbHabit[];
      return ResultHandler.success(data.map((habit) => fromDb(habit)));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };


  const create = async (data: Project): Promise<Result<string>> => {
    try {
      const project = toDb(data);

      const query = db.prepare(`
        INSERT INTO projects (id, title, description, categories, repolink, isPublic, status, tags, publishedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `);

      query.run(
        project.id,
        project.title,
        project.description,
        project.categories,
        project.repolink,
        project.isPublic,
        project.status,
        project.tags,
        project.publishedAt
      );
      return ResultHandler.success(project.id);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const update = async (data: Project): Promise<Result<Partial<Project>>> => {
    try {
      const projectExist = await exist(data.id);

      if (!projectExist)
        return ResultHandler.failure("Project not found", "NOT_FOUND");
      // Konverterer fra applikasjonsformat til databaseformat
      const project = toDb(data);

      const query = db.prepare(`
        UPDATE projects
        SET title = ?, description = ?, categories = ?, repolink = ?, isPublic = ?, status = ?, tags = ?, publishedAt = ?
        WHERE id = ?
      `);

      query.run(
        project.title,
        project.description,
        project.categories,
        project.repolink,
        project.isPublic,
        project.status,
        project.tags,
        project.publishedAt
      );
      // Returnerer den oppdaterte prosjektet
      return ResultHandler.success(data);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const remove = async (id: string): Promise<Result<string>> => {
    try {
      const project = await exist(id);
      if (!project)
        return ResultHandler.failure("project not found", "NOT_FOUND");
      const query = db.prepare("DELETE FROM projects WHERE id = ?");
      query.run(id);
      // Returnerer ID-en til den slettede vanen
      return ResultHandler.success(id);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  return { create, list, getById, update, exist, remove };
};

export type ProjectRepository = ReturnType<typeof createProjectRepository>;
*/

import { Result } from "src/types";
import type {
  CreateProject,
  Project,
  ProjectFromDb,
  UpdateProject,
} from "../helpers/index";
import db, { DB } from "src/db/db";
import { fromDb, toDb } from "../mappers";
import { Query } from "src/lib/query";

export const createProjectRepository = (db: DB) => {
  const exist = async (id: string): Promise<boolean> => {
    const query = db.prepare(
      "SELECT COUNT(*) as count FROM projects WHERE id = ?"
    );
    const data = query.get(id) as { count: number };
    return data.count > 0;
  };

  const getById = async (id: string): Promise<Result<Project>> => {
    try {
      const project = await exist(id);
      if (!project)
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "project not found" },
        };
      const query = db.prepare("SELECT * FROM project WHERE id = ?");
      const data = query.get(id) as ProjectFromDb;
      return {
        success: true,
        data: fromDb(data),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med henting av project",
        },
      };
    }
  };

  const list = async (params?: Query): Promise<Result<Project[]>> => {
    try {
      const { title, pageSize = 10, page = 0 } = params ?? {};

      const offset = (Number(page) - 1) * Number(pageSize);

      const hasPagination = Number(page) > 0;

      let query = "SELECT * FROM projects";
      query += title ? `WHERE title LIKE '%${title}%'` : "";
      query += pageSize ? ` LIMIT ${pageSize}` : "";
      query += offset ? ` OFFSET ${offset}` : "";

      const statement = db.prepare(query);

      const data = statement.all() as ProjectFromDb[];

      const { total } = db
        .prepare("SELECT COUNT(*) as total from projects")
        .get() as {
        total: number;
      };

      const totalPages = Math.ceil(total / Number(pageSize ?? 1));
      const hasNextPage = Number(page) < totalPages;
      const hasPreviousPage = Number(page ?? 1) > 1;

      return {
        success: true,
        data: data.map(fromDb),
        ...(hasPagination
          ? {
              total: data.length,
              pageSize,
              page,
              totalPages,
              hasNextPage,
              hasPreviousPage,
            }
          : {}),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med henting av projects",
        },
      };
    }
  };

  const create = async (data: CreateProject): Promise<Result<string>> => {
    try {
      const project = toDb(data);

      const query = db.prepare(`
        INSERT INTO projects (id, title, description, categories, repolink, isPublic, status, tags, publishedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

      query.run(
        project.title,
        project.description,
        project.categories,
        project.repolink,
        project.isPublic,
        project.status,
        project.tags,
        project.publishedAt
      );
      return {
        success: true,
        data: project.id,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med oppretting av project",
        },
      };
    }
  };

  const update = async (data: UpdateProject): Promise<Result<Project>> => {
    try {
      const projectExist = await exist(data.id);

      if (!projectExist)
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "Project not found" },
        };

      const project = toDb(data);

      const query = db.prepare(`
        UPDATE projects
        SET title = ?
        WHERE id = ?
      `);

      query.run(project.title, project.id);
      return {
        success: true,
        data: fromDb(project),
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med oppdatering av project",
        },
      };
    }
  };

  const remove = async (id: string): Promise<Result<string>> => {
    try {
      const project = await exist(id);
      if (!project)
        return {
          success: false,
          error: { code: "NOT_FOUND", message: "project not found" },
        };
      const query = db.prepare("DELETE FROM projects WHERE id = ?");
      query.run(id);
      return {
        success: true,
        data: id,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Feil med sletting av project",
        },
      };
    }
  };

  return { create, list, getById, update, remove };
};

export const projectRepository = createProjectRepository(db);

export type ProjectRepository = ReturnType<typeof createProjectRepository>;
