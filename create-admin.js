const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('Ismaloups31$@', 10);
  const user = await prisma.user.create({
    data: { email: 'ismaelaj@icloud.com', passwordHash: hash, role: 'ADMIN' }
  });
  console.log('Admin créé:', user.email);
}

main().then(() => prisma.$disconnect());