import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "node:fs/promises";
import { Project } from "./features/projects/types";
import { projectsSchema } from "./features/projects/helpers";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5174", // Specify the frontend origin
    credentials: true, // Allow credentials to be included in requests
  })
);

app.use("/portofolio/*", serveStatic({ root: "./" }));

// Sender data til serveren og lagrer prosjektet i en tom liste.
let projects: Project[] = [
  {
    id: "1",
    title: "Prosjekt eksempel 1",
    description: "Her kommer det kul beskrivelse",
    categories: ["En kategorie", "Enda en kategori"],
    repolink: "Her kommer linken til repoet",
    publishedAt: new Date("2023-10-05T15:30:00Z"),
    isPublic: true,
    status: true,
    tags: ["Tag eksempel 1", "tag eksempel 2"],
  },
];

// Henter alle prosjekter fra serveren
app.get("/projects", async (c) => {
  const data = await fs.readFile("./src/db/data.json", "utf8");
  const dataAsJson = JSON.parse(data);
  return c.json(dataAsJson);
});

app.post("/add", async (c) => {
  const newProject = await c.req.json();
  console.log(newProject);

  const project = projectsSchema.parse(newProject);

  if (!project) return c.json({ error: "Invalid project" }, { status: 400 });
  console.log(project);
  projects.push(project);

  return c.json<Project[]>(projects, { status: 201 });
});

/*
app.post("/add", async (c) => {
  const newProject = await c.req.json();
  const result = projectsSchema.safeParse(newProject);

  if (!result.success) {
    return c.json(
      { error: "Invalid project data", details: result.error.errors },
      { status: 400 }
    );
  }

  const project = result.data;
  projects.push(project);
  return c.json<Project[]>(projects, { status: 201 });
});
*/

app.get("/", (c) => {
  return c.json<Project[]>(projects);
});

app.delete("/delete", async (c) => {
  const id = c.req.param("id");
  projects = projects.filter((project) => project.id !== id);
  return c.json<Project[]>(projects, { status: 201 });
});

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
