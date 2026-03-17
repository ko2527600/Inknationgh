import { PrismaClient } from '@prisma/client';

// Best practice: Ensure only one PrismaClient instance is running in development to avoid connection limits
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
