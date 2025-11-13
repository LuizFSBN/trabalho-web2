import { FastifyInstance } from 'fastify';
import { updateLocation, getLastLocation, getBusesByRoute } from '../controllers/buses.controller';

export default async function busesRoutes(fastify: FastifyInstance) {
  fastify.post('/buses/:busId/location', { preHandler: [fastify.authenticate] }, updateLocation);
  fastify.get('/buses/:busId/location', { preHandler: [fastify.authenticate] }, getLastLocation);
  fastify.get('/buses/route/:routeId', { preHandler: [fastify.authenticate] }, getBusesByRoute);
}
