// ... imports av typer, fs og join

import { DB } from "./db";
import { join } from "path";
import fs from "node:fs/promises";
import { fileURLToPath } from "url";
import { Project } from "src/features/projects/helpers";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const seed = async (db: DB) => {
  const path = join(__dirname, "data.json");
  const file = await fs.readFile(path, "utf-8");
  const { projects } = JSON.parse(file) as { projects: Project[] };

  const insertProject = db.prepare(`
        INSERT INTO projects (id, title, description, categories, repolink, isPublic, status, tags, publishedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

  // ... (lignende prepare-statements for habits og streaks)

  //db.transaction(() => {
  //  for (const user of users) {
  //    insertUser.run(user.id, user.email, user.name);
  //  }
  // ... (lignende løkker for habits og streaks)
  db.transaction(() => {
    for (const project of projects) {
      insertProject.run(
        project.id,
        project.title,
        project.description,
        JSON.stringify(project.categories),
        project.repolink,
        project.isPublic ? "true" : "false",
        project.status ? "true" : "false",
        JSON.stringify(project.tags),
        project.publishedAt
          ? new Date(project.publishedAt).toISOString()
          : new Date().toISOString()
      );
    }
  })();
};
