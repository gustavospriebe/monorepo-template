import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  // Core
  NODE_ENV: z
    .enum(["test", "development", "production"])
    .default("development"),
  DATABASE_URL: z.string(),
  VERCEL_FRONTEND_SECRET: z.string(),
  FRONTEND_BASE_URL: z.string(),

  // Service Specific
  PORT: z.coerce.number().default(8000),
  JWT_SECRET: z.string(),
  COOKIE_SECRET: z.string(),

  // External Services
  SLACK_TOKEN: z.string(),
  RESEND_API_KEY: z.string(),

  // AWS
  AWS_ACCESS_KEY_S3: z.string(),
  AWS_SECRET_ACCESS_KEY_S3: z.string(),
  RDS_CA_CERT: z.string(),

  // Test
  TEST_PORT: z.coerce.number().default(8001),

  // Sentry
  SENTRY_DSN: z.string().optional(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error("⚠️ Invalid environment variables", _env.error.format())

  throw new Error("Invalid environment variables.")
}

export const env = _env.data
