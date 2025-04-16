import { defineConfig } from "kysely-ctl"
import { db } from "./src/database"

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: "./src/migrations",
  },
  // seeds: {
  //   seedFolder: "./src/seeds",
  // },
})
