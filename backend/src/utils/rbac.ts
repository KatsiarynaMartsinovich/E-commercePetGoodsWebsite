import { FastifyRequest, FastifyReply } from 'fastify';

// Хелпер для проверки роли
export function roleGuard(allowedRoles: string[]) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    if (!request.user) {
      return reply.code(401).send({ error: 'Unauthorized', message: 'Authentication required' });
    }

    const userRole = request.user.role;

    if (!allowedRoles.includes(userRole)) {
      return reply.code(403).send({ error: 'Forbidden', message: 'Insufficient permissions' });
    }
  };
}