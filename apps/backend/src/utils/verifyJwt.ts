import { FastifyReply } from "fastify/types/reply.js"
import { FastifyRequest } from "fastify/types/request.js"
import { JWTPayload } from "../types/jwt.js"

export async function verifyJwt(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<JWTPayload | void> {
  try {
    await request.jwtVerify()
    return request.user
  } catch (err) {
    return reply.status(401).send({
      success: false,
      message: "Não autorizado",
      error: err instanceof Error ? err.message : "Erro desconhecido",
    })
  }
}
