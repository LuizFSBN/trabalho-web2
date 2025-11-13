import { FastifyInstance } from 'fastify';
import { getAllRoutes } from '../controllers/routes.controller';

export default async function routesRoutes(fastify: FastifyInstance) {
  fastify.get('/routes', { preHandler: [fastify.authenticate] }, getAllRoutes);
}
