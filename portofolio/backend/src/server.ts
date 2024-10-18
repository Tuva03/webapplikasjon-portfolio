import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { Project, ProjectSchema } from "../types";
import fs from "node:fs/promises";

const app = new Hono();

app.use("/*", cors());

app.use("/portofolio/*", serveStatic({ root: "./" }));

// Sender data til serveren og lagrer prosjektet i en tom liste.
let projects: Project[] = [
  {
    id: "1",
    title: "Prosjekt eksempel 1",
    beskrivelse: "Her kommer det kul beskrivelse",
    repo_link: "Her kommer linken til repoet",
  },
];

// Henter alle prosjekter fra serveren
app.get("/projects", async (c) => {
  const data = await fs.readFile(
    "../frontend/src/components/prosjektdata.json",
    "utf8"
  );
  const dataAsJson = JSON.parse(data);
  return c.json(dataAsJson);
});

app.post("/add", async (c) => {
  const newProject = await c.req.json();
  console.log(newProject);

  const project = ProjectSchema.parse(newProject);

  if (!project) return c.json({ error: "Invalid project" }, { status: 400 });
  console.log(project);
  projects.push(project);

  return c.json<Project[]>(projects, { status: 201 });
});

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
