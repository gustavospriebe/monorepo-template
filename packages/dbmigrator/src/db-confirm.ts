import { execSync } from "child_process"
import dotenv from "dotenv"
import readline from "readline"

dotenv.config()

const databaseUrl = process.env.DATABASE_URL || "Not set"
const action = process.argv[2] // 'migrate', 'rollback', 'rollback:all', or 'remigrate'

const validActions = ["migrate", "rollback", "rollback:all", "remigrate"]
if (!action || !validActions.includes(action)) {
  console.error(`Usage: tsx src/db-confirm.ts ${validActions.join("|")}`)
  process.exit(1)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Determine if this is a local or production database
const isLocalDatabase =
  databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1")
const environmentWarning = isLocalDatabase
  ? "\x1b[32mThis is a LOCAL database\x1b[0m" // Green text for local
  : "\x1b[41m\x1b[1m⚠️  CAUTION: This appears to be a PRODUCTION database! ⚠️\x1b[0m" // Red background for production

const actionDisplay = action.replace(":", " ").toUpperCase()
console.log(`\n===== DATABASE ${actionDisplay} CONFIRMATION =====`)
console.log(`DATABASE_URL: ${databaseUrl}`)
console.log(environmentWarning)
console.log("=========================================\n")

let warningMessage = ""
if (action === "rollback:all") {
  warningMessage = "WARNING: This will rollback ALL migrations!\n"
} else if (action === "remigrate") {
  warningMessage =
    "WARNING: This will rollback ALL migrations and then reapply them!\n"
}

if (warningMessage) {
  console.log("\x1b[31m%s\x1b[0m", warningMessage) // Red text for warning
}

rl.question(
  `Are you sure you want to ${action.replace(":", " ")}? (y/N): `,
  (answer) => {
    if (answer.toLowerCase() === "y") {
      console.log(`Running ${action.replace(":", " ")}...`)
      try {
        switch (action) {
          case "migrate":
            execSync("kysely migrate:latest", { stdio: "inherit" })
            execSync("pnpm codegen", { stdio: "inherit" })
            break
          case "rollback":
            execSync("kysely migrate:down", { stdio: "inherit" })
            break
          case "rollback:all":
            execSync("kysely migrate:rollback --all", { stdio: "inherit" })
            break
          case "remigrate":
            execSync("kysely migrate:rollback --all", { stdio: "inherit" })
            console.log("Rollback completed. Now applying migrations...")
            execSync("kysely migrate:latest", { stdio: "inherit" })
            execSync("pnpm codegen", { stdio: "inherit" })
            break
        }
        console.log(`${action.replace(":", " ")} completed successfully!`)
      } catch (error) {
        console.error(`${action.replace(":", " ")} failed:`, error)
        process.exit(1)
      }
    } else {
      console.log(`${action.replace(":", " ")} cancelled.`)
    }
    rl.close()
  },
)
