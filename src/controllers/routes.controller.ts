import { FastifyReply, FastifyRequest } from 'fastify';

export async function getAllRoutes(request: FastifyRequest, reply: FastifyReply) {
  const routes = await (request.server as any).prisma.route.findMany();
  return reply.send(routes);
}
