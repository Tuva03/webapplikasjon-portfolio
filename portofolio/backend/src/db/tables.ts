import type { DB } from "./db";

export const createTables = async (db: DB) => {
  db.exec(`

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    categories TEXT NOT NULL,
    repolink TEXT NOT NULL,
    isPublic TEXT NOT NULL,
    status TEXT NOT NULL,
    tags TEXT NOT NULL,
    publishedAt TEXT
  );
`);
};
