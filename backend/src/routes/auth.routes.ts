import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { AuthService } from '../services/auth.service.js';

export default async function authRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  // POST /api/auth/register
  app.post('/register', {
    schema: {
      body: registerSchema,
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
      body: loginSchema,
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