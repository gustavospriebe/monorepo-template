import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import dotenv from "dotenv";
import Fastify from "fastify";
import { Server } from "http";
import { ZodError } from "zod";
import { env } from "./config/env.js";
import { appRoutes } from "./routes/app.js";
import { jwtErrorCustomMessages } from "./utils/jwtErrorCustomMessages.js";

dotenv.config();

export const app = Fastify();

// Configure CORS
app.register(cors, {
  origin: [
    "https://app.gustavospriebe.com",
    process.env.NODE_ENV === "development" ? "http://localhost:5173" : null,
  ].filter(Boolean) as string[],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-vercel-frontend-secret"],
});

// Add rate limiting before the secret check
// fastify.register(rateLimit, {
//   max: 100, // maximum 100 requests
//   timeWindow: '1 minute', // per minute
//   hook: 'onRequest', // apply rate limiting before processing request
//   errorResponseBuilder: function (request, context) {
//     return {
//       code: 429,
//       error: "Too Many Requests",
//       message: `Too many requests, please try again later.`,
//     }
//   },
// })

app.register(cookie, {
  secret: env.COOKIE_SECRET,
  hook: "onRequest",
  parseOptions: {
    sameSite: "lax",
    // secure: env.NODE_ENV === "production",
    // httpOnly: true,
    // signed: true,
  },
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  messages: jwtErrorCustomMessages,
  cookie: {
    cookieName: "accessToken",
    signed: false,
  },
});

app.addHook("onRequest", async (request, reply) => {
  if (request.url === "/app/health-check") {
    return;
  }
  if (process.env.NODE_ENV !== "development") {
    const vercelSecret = request.headers["x-vercel-frontend-secret"];

    if (!vercelSecret || vercelSecret !== process.env.VERCEL_FRONTEND_SECRET) {
      return reply.status(403).send({ error: "Access denied" });
    }
  }
});

app.addHook("onResponse", (request, reply, done) => {
  console.log(
    `[${request.method}] ${request.url} - Status: ${reply.statusCode}`
  );
  done();
});

app.register(appRoutes, { prefix: "/app" });

export let server: Server;

export const startServer = async (): Promise<Server> => {
  const port = env.NODE_ENV === "test" ? env.TEST_PORT : env.PORT;
  await app.listen({
    host: "0.0.0.0",
    port,
  });
  server = app.server;
  console.log(`HTTP Server Running: ${port}`);
  return server;
};

if (process.env.NODE_ENV !== "test") {
  startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
}

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      success: false,
      issues: error.format(),
    });
  }

  if (error.code === "FST_REQ_FILE_TOO_LARGE") {
    return reply.status(413).send({
      success: false,
      message: "O arquivo é muito grande. O tamanho máximo permitido é 5MB.",
    });
  }

  if (error.code === "FST_JWT_NO_AUTHORIZATION_IN_HEADER") {
    return reply.status(401).send({ message: error.message, success: false });
  }
  if (error.code === "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED") {
    return reply.status(401).send({ message: error.message, success: false });
  }
  if (error.code === "FAST_JWT_INVALID_ALGORITHM") {
    return reply.status(401).send({ message: error.message, success: false });
  }
  if (error.code === "FST_JWT_AUTHORIZATION_TOKEN_INVALID") {
    return reply.status(401).send({ message: error.message, success: false });
  }
  if (env.NODE_ENV !== "production") {
    console.error(error);
  }
  return reply.status(500).send({
    success: false,
    message: error.message,
  });
});
