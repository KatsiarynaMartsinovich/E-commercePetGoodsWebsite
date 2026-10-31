import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma.js';
import { RegisterInput, LoginInput } from '../schemas/auth.schema.js';

const SALT_ROUNDS = 10;

export class AuthService {
  static async register(data: RegisterInput) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new Error('Email already in use');

    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
    
    // Создаем пользователя
    const user = await prisma.user.create({
      data: { 
        email: data.email, 
        passwordHash: passwordHash,
        role: 'CUSTOMER'
      },
      select: { 
        id: true, 
        email: true, 
        role: true, 
        createdAt: true             
      },
    });
    return user;
  }

  static async login(data: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) throw new Error('Invalid credentials');

    return { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    };
  }
}