import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { ProjectSchema, type Project } from "./types";
import fs from "node:fs/promises";

const app = new Hono();

app.use("/*", cors());

app.use("/portofolio/*", serveStatic({ root: "./" }));

// Sender data til serveren og lagrer prosjektet i en tom liste.
const projects: Project[] = [
  {
    prosjekt_navn: "Prosjekt eksempel 1",
    beskrivelse: "Her kommer det kul beskrivelse",
    repo_link: "Her kommer linken til repoet",
  },
];

// Henter alle prosjekter fra serveren
app.get("/json", async (c) => {
  const data = await fs.readFile("./prosjektdata.json", "utf8");
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

const port = 3999;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
