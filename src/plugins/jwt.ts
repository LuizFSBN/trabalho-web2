import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
  const secret = process.env.JWT_SECRET || 'dev_secret';
  await fastify.register(fastifyJwt, { secret });

  fastify.decorate('authenticate', async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    authenticate(request: any, reply: any): Promise<void>;
  }
}
