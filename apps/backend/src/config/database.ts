import fs from "fs";
import { Kysely, PostgresDialect } from "kysely";
import pkg from "pg";
// import { DB } from "../types/db.js"
import { env } from "./env.js";

const { Pool } = pkg;

const customPool = new Pool({
  connectionString:
    env.NODE_ENV === "production"
      ? env.DATABASE_URL
      : env.DATABASE_URL?.replace("localhost", "postgres"),
  ssl:
    env.NODE_ENV === "production"
      ? {
          ca: fs.readFileSync("/app/.postgresql/global-bundle.pem").toString(),
          rejectUnauthorized: true,
          checkServerIdentity: () => undefined,
        }
      : false,
  max: 10,
  // min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
});

const dialect = new PostgresDialect({
  pool: customPool,
});

const db = new Kysely
 // <DB>
(
  {
    dialect,
  }
);

export { db };
