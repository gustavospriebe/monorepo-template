export interface JWTPayload {
  user_id: string
  email: string
  name: string
  active: boolean
  orgs: Array<{
    id: string
    name: string
    logo_url: string
    permission: string
    plans: string[]
  }>
  jti: string
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: JWTPayload
    user: JWTPayload
  }
}
