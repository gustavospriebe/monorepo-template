import { FastifyInstance } from "fastify/types/instance.js";
import { AppController } from "../controllers/app/index.js";

export async function appRoutes(app: FastifyInstance) {
  app.get("/health-check", AppController.healthCheckController);
}
