import { FastifyReply } from "fastify/types/reply.js"
import { FastifyRequest } from "fastify/types/request.js"
import { z } from "zod"

function parseQueryArray(
  query: Record<string, string | string[]>,
): Record<string, string | string[]> {
  const parsedQuery: Record<string, string | string[]> = {}
  for (const [key, value] of Object.entries(query)) {
    if (key.endsWith("[]")) {
      const newKey = key.slice(0, -2)
      parsedQuery[newKey] = Array.isArray(value) ? value : [value]
    } else {
      parsedQuery[key] = value
    }
  }
  return parsedQuery
}

export function validateRequest<T extends z.ZodSchema>(
  schema: T,
  req: FastifyRequest,
  reply: FastifyReply,
  type: "body" | "params" | "query" | "paramsAndQuery",
): z.infer<T> | false {
  let dataToValidate: z.infer<T>

  switch (type) {
    case "body":
      dataToValidate = req.body
      break
    case "params":
      dataToValidate = req.params
      break
    case "query":
      dataToValidate = parseQueryArray(
        req.query as Record<string, string | string[]>,
      )
      break
    case "paramsAndQuery":
      dataToValidate = {
        ...(req.params as object),
        ...parseQueryArray(req.query as Record<string, string | string[]>),
      }
      break
    default:
      reply.status(400).send({ message: "Invalid validation type" })
      return false
  }

  const request = schema.safeParse(dataToValidate)

  if (!request.success) {
    const errors = request.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }))

    const errorMessages = errors
      .map((error) => `${error.field}: ${error.message}`)
      .join(", ")

    reply.status(400).send({ message: `Erro de validação - ${errorMessages}` })
    return false
  }

  return request.data
}
