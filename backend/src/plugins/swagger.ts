import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { FastifyInstance } from 'fastify';

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Pet Goods API',
        description: 'REST API для интернет-магазина товаров для питомцев',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Локальный сервер разработки',
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Вставьте JWT-токен, полученный при логине',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });

  await fastify.register(fastifySwaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
    staticCSP: true,
  });
});