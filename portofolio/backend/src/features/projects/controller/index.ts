/*import { Hono } from "hono";
import { projectService, type ProjectService } from "../service";
import { errorResponse } from "@/lib/error";
import type { Data } from "@/types";
import db from "@/db/db";
import { authenticate } from "@/features/users/utils/middleware";

// Definerer en funksjon som oppretter og konfigurerer controlleren
export const createProjectController = (projectService: ProjectService) => {
  // Oppretter en ny Hono-app for ruting
  const app = new Hono();

  // Legger til autentiseringsmiddleware for alle ruter
  app.use(authenticate());

  // POST-rute for å opprette en ny vane
  app.post("/", async (c) => {
    const data = await c.req.json();
    const result = await projectService.create({
      ...data,
    });
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result, { status: 201 });
  });

  app.get("/", async (c) => {
    // Henter ut query-params
    const query = c.req.query();
    const result = await projectService.list(query);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  // Henter ut en enkelt vane med :id som dynamisk param
  // Eks: localhost:3999/api/v1/habits/123-456-789
  app.get("/:id", async (c) => {
    // Henter ut id parameteren fra urlen
    const id = c.req.param("id");
    const result = await projectService.getById(id);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  // Bruker post for å håndtere POST request brukt for lagring av vane
  app.post("/", async (c) => {
    const data = await c.req.json();
    const result = await projectService.create({
      ...data,
    });
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json<Data<string>>(result, { status: 201 });
  });

  // Bruker patch for å håndtere PATCH request ved publisering av en vane
  app.patch("/:id/publish", async (c) => {
    const id = c.req.param("id");
    const result = await projectService.publish(id);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  // Bruker også patch for å oppdatere en vane
  app.patch("/:id", async (c) => {
    const id = c.req.param("id");
    const data = await c.req.json();
    const result = await projectService.update({
      id,
      ...data,
    });
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  // Bruker delete for å håndtere DELETE request av en vane
  app.delete("/:id", async (c) => {
    const id = c.req.param("id");
    const result = await projectService.remove(id);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  return app;
};

// Eksporterer en instans av controlleren med den konfigurerte habitService
export const projectController = createProjectController(projectService);
*/

import { Hono } from "hono";
import { projectService, ProjectService } from "../service";
import { validateQuery } from "src/lib/query";
import { ErrorCode, errorResponse } from "src/lib/error";

export const createProjectController = (projectService: ProjectService) => {
  const app = new Hono();

  app.get("/", async (c) => {
    const query = validateQuery(c.req.query()).data ?? {};

    const result = await projectService.list(query);

    if (!result.success)
      return errorResponse(
        c,
        result.error.code as ErrorCode,
        result.error.message
      );
    return c.json(result);
  });

  app.get("/:id", async (c) => {
    const id = c.req.param("id");
    const result = await projectService.getById(id);

    if (!result.success)
      return errorResponse(
        c,
        result.error.code as ErrorCode,
        result.error.message
      );
    return c.json(result);
  });

  app.post("/", async (c) => {
    const data = await c.req.json();
    const result = await projectService.create(data);
    if (!result.success)
      return errorResponse(
        c,
        result.error.code as ErrorCode,
        result.error.message
      );
    return c.json(result, { status: 201 });
  });

  app.patch("/:id", async (c) => {
    const id = c.req.param("id");
    const data = await c.req.json();

    const result = await projectService.update({ id, ...data });
    if (!result.success)
      return errorResponse(
        c,
        result.error.code as ErrorCode,
        result.error.message
      );
    return c.json(result);
  });

  app.delete("/:id", async (c) => {
    const id = c.req.param("id");
    const result = await projectService.remove(id);
    if (!result.success)
      return errorResponse(
        c,
        result.error.code as ErrorCode,
        result.error.message
      );
    return c.json(result);
  });

  return app;
};

export const projectController = createProjectController(projectService);
