import Fastify, { FastifyError } from 'fastify';
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import multipart from '@fastify/multipart';
import redisPlugin from './plugins/redis.js';

import jwtPlugin from './plugins/jwt.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL ?? 'info',
    transport:
      process.env.NODE_ENV === 'production'
        ? undefined
        : {
            target: 'pino-pretty',
            options: { colorize: true, translateTime: 'HH:MM:ss', ignore: 'pid,hostname' },
          },
  },
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error: FastifyError, _request, reply) => {
  if (error.validation) {
    return reply.code(400).send({
      error: 'Validation Error',
      message: error.message,
      details: error.validation,
    });
  }
  
  server.log.error(error);
  
  return reply.code(error.statusCode ?? 500).send({
    error: error.name ?? 'Internal Server Error',
    message: error.message,
  });
});

server.get('/health', async () => ({ status: 'ok', uptime: process.uptime() }));

server.register(multipart, {
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
});
server.register(jwtPlugin);
server.register(redisPlugin); 
server.register(authRoutes, { prefix: '/api/auth' });
server.register(productRoutes, { prefix: '/api/products' });
server.register(cartRoutes, { prefix: '/api/cart' });

const start = async () => {
  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? '0.0.0.0';
  try {
    await server.listen({ port, host });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

const shutdown = async (signal: string) => {
  server.log.info(`Received ${signal}, shutting down gracefully...`);
  try {
    await server.close();
    process.exit(0);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

start();