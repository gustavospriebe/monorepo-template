import Fastify from "fastify";
import type { User } from "@newcompany/types";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async () => {
  // Example usage of the shared User type
  const exampleUser: User = {
    id: "123",
    name: "Example User",
    email: "user@example.com",
    createdAt: new Date(),
  };
  fastify.log.info(`Example user: ${exampleUser.name}`);
  return { hello: "world", userEmail: exampleUser.email };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
