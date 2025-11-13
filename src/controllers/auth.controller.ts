import { FastifyReply, FastifyRequest } from 'fastify';
import { hash, compare } from '../utils/password';

export async function registerStudent(request: FastifyRequest, reply: FastifyReply) {
  const body: any = request.body;
  const { name, email, password, universityId, registration } = body;

  const u = await (request.server as any).prisma.university.findUnique({
    where: { id: universityId }
  });

  if (!u) {
    return reply.status(400).send({ error: 'Universidade inválida' });
  }

  if (!email.endsWith(`@${u.domain}`)) {
    return reply.status(400).send({ error: 'Email precisa ser do domínio da universidade' });
  }

  const passwordHash = await hash(password);

  const user = await (request.server as any).prisma.student.create({
    data: { name, email, passwordHash, universityId, registration }
  });

  return reply.send({
    id: user.id,
    email: user.email
  });
}

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as any;
  const prisma = (request.server as any).prisma;

  // --- LOGIN DO ALUNO ---
  const student = await prisma.student.findUnique({ where: { email } });
  if (student) {
    const ok = await compare(password, student.passwordHash);
    if (!ok) {
      return reply.status(401).send({ error: 'Credenciais inválidas' });
    }

    const token = await reply.jwtSign({
      sub: student.id,
      role: 'STUDENT',
      email: student.email
    });

    return reply.send({ token });
  }

  // --- LOGIN DO MOTORISTA ---
  const driver = await prisma.driver.findUnique({ where: { email } });
  if (driver) {
    const ok = await compare(password, driver.passwordHash);
    if (!ok) {
      return reply.status(401).send({ error: 'Credenciais inválidas' });
    }

    const token = await reply.jwtSign({
      sub: driver.id,
      role: 'DRIVER',
      email: driver.email
    });

    return reply.send({ token });
  }

  // --- NÃO ENCONTROU NEM ALUNO NEM MOTORISTA ---
  return reply.status(404).send({ error: 'Usuário não encontrado' });
}
