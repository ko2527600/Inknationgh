import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';


async function createFirstAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@ikenation.com';
  const password = process.env.ADMIN_PASSWORD || 'AdminPassword123!'; 

  
  try {
    const existing = await prisma.user.findUnique({
      where: { email }
    });

    if (existing) {
      console.log('Admin user already exists!');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: 'System',
        lastName: 'Admin',
        role: 'ADMIN'
      }
    });

    console.log('=================================');
    console.log('✅ FIRST ADMIN USER CREATED');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('=================================');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createFirstAdmin();
