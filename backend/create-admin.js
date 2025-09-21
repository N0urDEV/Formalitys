const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

// Use external production database URL (override internal Railway URL)
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:wunAVRXxMudQhyyPmKTjFXxaSlhznMch@ballast.proxy.rlwy.net:14968/railway'
    }
  }
});

async function createAdmin() {
  try {
    console.log('Connecting to database...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    
    const hashedPassword = await bcrypt.hash('formalitys#admin123', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@formalitys.com',
        passwordHash: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN'
      }
    });
    
    console.log('Admin user created successfully:', admin.email);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();