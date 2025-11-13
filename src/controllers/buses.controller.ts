import { FastifyReply, FastifyRequest } from 'fastify';

export async function updateLocation(request: FastifyRequest, reply: FastifyReply) {
  const busId = (request.params as any).busId;
  const { latitude, longitude } = request.body as any;

  const loc = await (request.server as any).prisma.location.create({
    data: { busId, latitude: Number(latitude), longitude: Number(longitude) }
  });
  return reply.send(loc);
}

export async function getLastLocation(request: FastifyRequest, reply: FastifyReply) {
  const busId = (request.params as any).busId;

  const last = await (request.server as any).prisma.location.findFirst({
    where: { busId },
    orderBy: { timestamp: 'desc' }
  });
  return reply.send(last);
}

export async function getBusesByRoute(request: FastifyRequest, reply: FastifyReply) {
  const routeId = (request.params as any).routeId;

  const buses = await (request.server as any).prisma.bus.findMany({
    where: { routeId },
    include: { locations: { take: 1, orderBy: { timestamp: 'desc' } } }
  });
  return reply.send(buses);
}
