const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.contactMessage.findMany().then(console.log).finally(() => prisma.$disconnect());
