import { FastifyInstance } from 'fastify';
import { registerStudent, login } from '../controllers/auth.controller';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/register', registerStudent);
  fastify.post('/auth/login', login);
}
