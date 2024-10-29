import Database from "better-sqlite3";
import { env } from "src/lib/env";
import { makeLogger } from "src/lib/logger";

export const db = new Database(env.DATABASE_URL, {
  verbose: (message: unknown) => makeLogger().info(`${message}`),
});

export type DB = typeof db;

export default db;
