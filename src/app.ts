import Fastify from 'fastify';
import * as dotenv from 'dotenv';
dotenv.config();

import prismaPlugin from './plugins/prisma';
import jwtPlugin from './plugins/jwt';
import corsPlugin from './plugins/cors';
import swaggerPlugin from './plugins/swagger';
import universityRoutes from "./routes/university.routes";

const app = Fastify({ logger: true });

// plugins
app.register(prismaPlugin);
app.register(jwtPlugin);
app.register(corsPlugin);
app.register(swaggerPlugin);

// rotas - usamos require(...).default para evitar problemas de import dinâmico no ts-node-dev
app.register(require('./routes/auth.routes').default, { prefix: '/api' });
app.register(require('./routes/buses.routes').default, { prefix: '/api' });
app.register(require('./routes/routes.routes').default, { prefix: '/api' });
app.register(universityRoutes, { prefix: '/api' });

app.get('/', async (request, reply) => {
  return { ok: true, app: 'UniBus Fastify API (MongoDB)' };
});

export default app;
