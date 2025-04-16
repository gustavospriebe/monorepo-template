import { FastifyReply } from "fastify/types/reply.js";
import { FastifyRequest } from "fastify/types/request.js";

export const healthCheckController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const message = "I am alive!";

  return reply.status(200).send({ status: message });
};
