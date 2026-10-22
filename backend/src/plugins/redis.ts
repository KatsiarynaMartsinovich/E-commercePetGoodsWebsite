import fp from 'fastify-plugin';
import { Redis } from 'ioredis';
import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis;
  }
}

export default fp(async function (fastify: FastifyInstance) {
  const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379';

  const redis = new Redis(redisUrl, {
    maxRetriesPerRequest: 2,
    enableOfflineQueue: true,
    lazyConnect: false,
  });

  redis.on('error', (err) => {
    fastify.log.error({ err }, 'Redis error');
  });

  redis.on('connect', () => {
    fastify.log.info('Redis connected');
  });

  fastify.decorate('redis', redis);

  fastify.addHook('onClose', async () => {
    await redis.quit();
  });
});