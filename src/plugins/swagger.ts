import fp from "fastify-plugin";
import swagger from "@fastify/swagger";

export default fp(async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "UniBus API",
        description: "API de transporte universitário",
        version: "1.0.0",
      },
    },
  });
});
