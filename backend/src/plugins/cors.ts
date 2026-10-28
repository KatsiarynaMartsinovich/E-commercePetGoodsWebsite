import fp from 'fastify-plugin';
import fastifyCors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

function parseOrigins(raw: string | undefined): string[] {
  return (raw ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export default fp(async function (fastify: FastifyInstance) {
  const origins = parseOrigins(process.env.CORS_ORIGINS);

  if (origins.length === 0) {
    fastify.log.warn('CORS_ORIGINS is empty: browser clients will be blocked');
  }

  await fastify.register(fastifyCors, {
    origin: origins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86400,
  });
});