import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const uni = await prisma.university.upsert({
    where: { name: 'Universidade Exemplo' },
    update: {},
    create: { name: 'Universidade Exemplo', domain: 'exemplo.edu.br' }
  });

  const pwd = await bcrypt.hash('student123', 10);
  await prisma.student.upsert({
    where: { email: 'aluno@exemplo.edu.br' },
    update: {},
    create: {
      name: 'Aluno Teste',
      email: 'aluno@exemplo.edu.br',
      passwordHash: pwd,
      registration: '2025001',
      universityId: uni.id
    }
  });

  const driverPwd = await bcrypt.hash('driver123', 10);
  const driver = await prisma.driver.upsert({
    where: { email: 'motorista@exemplo.edu.br' },
    update: {},
    create: { name: 'Motorista', email: 'motorista@exemplo.edu.br', passwordHash: driverPwd }
  });

  const route = await prisma.route.upsert({
    where: { name: 'Rota Campus - Centro' },
    update: {},
    create: { name: 'Rota Campus - Centro', description: 'Do campus ao centro', stops: '["Campus","Parada A","Parada B","Centro"]' }
  });

  const bus = await prisma.bus.upsert({
    where: { plate: 'UNI-0001' },
    update: {},
    create: { plate: 'UNI-0001', model: 'Micro Ônibus', driverId: driver.id, routeId: route.id }
  });

  await prisma.location.create({
    data: { busId: bus.id, latitude: -1.3722, longitude: -48.4872 }
  });

  console.log('Seed concluído');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
