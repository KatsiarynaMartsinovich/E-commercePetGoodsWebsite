import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { AuthService } from '../services/auth.service.js';

const errorSchema = z.object({
  error: z.string(),
  message: z.string(),
});

export default async function authRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  // POST /api/auth/register
  app.post('/register', {
    schema: {
      tags: ['Auth'],
      summary: 'Регистрация нового пользователя',
      description: 'Создаёт пользователя с ролью CUSTOMER. Пароль хешируется bcrypt.',
      body: registerSchema,
      response: {
        201: z.object({
          id: z.string().uuid(),
          email: z.string().email(),
          role: z.enum(['CUSTOMER', 'ADMIN']),
          createdAt: z.date(),
        }),
        409: errorSchema,
        500: errorSchema,
      },
    },
  }, async (request, reply) => {
    try {
      const user = await AuthService.register(request.body);
      return reply.code(201).send(user);
    } catch (error: any) {
      if (error.message === 'Email already in use') {
        return reply.code(409).send({ error: 'Conflict', message: error.message });
      }
      fastify.log.error(error);
      return reply.code(500).send({ error: 'Internal Server Error', message: 'Something went wrong' });
    }
  });

  // POST /api/auth/login
  app.post('/login', {
    schema: {
      tags: ['Auth'],
      summary: 'Авторизация и получение JWT',
      description: 'Возвращает JWT-токен (срок действия 1 день) и данные пользователя.',
      body: loginSchema,
      response: {
        200: z.object({
          token: z.string(),
          user: z.object({
            id: z.string().uuid(),
            email: z.string().email(),
            role: z.enum(['CUSTOMER', 'ADMIN']),
          }),
        }),
        401: errorSchema,
        500: errorSchema,
      },
    },
  }, async (request, reply) => {
    try {
      const user = await AuthService.login(request.body);

      const token = fastify.jwt.sign({ id: user.id, role: user.role });

      return reply.send({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        return reply.code(401).send({ error: 'Unauthorized', message: error.message });
      }
      fastify.log.error(error);
      return reply.code(500).send({ error: 'Internal Server Error', message: 'Something went wrong' });
    }
  });
}