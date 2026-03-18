import 'dotenv/config';
import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';

const createAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL || 'admin@ikenation.com';
    const password = process.env.ADMIN_PASSWORD || 'AdminPassword123!';

    console.log(`Checking if admin ${email} already exists...`);
    const existingAdmin = await prisma.user.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      console.log('Admin user already exists. Updating password...');
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      console.log('Admin password updated successfully!');
    } else {
      console.log('Creating new admin user...');
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'ADMIN',
          firstName: 'Admin',
          lastName: 'IkeNation'
        }
      });
      console.log('Admin user created successfully!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
