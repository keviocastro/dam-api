import { PrismaClient } from '@prisma/client';

// Simple PrismaClient instance
// The database type is determined by the DATABASE_URL in .env
const prisma = new PrismaClient();

export default prisma;

