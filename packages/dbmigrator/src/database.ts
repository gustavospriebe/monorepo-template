import { Kysely, PostgresDialect } from "kysely"
import pkg from "pg"
import type { DB } from "./db.d.ts"

const { Pool } = pkg

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("localhost")
      ? undefined
      : { rejectUnauthorized: false },
    max: 10,
  }),
})

export const db = new Kysely<DB>({
  dialect,
})
