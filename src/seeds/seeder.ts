import { prisma } from "../services";

async function seed() {
  try {
    // Seed users
    await prisma.user.createMany({
      data: [
        {
          name: 'Regular User',
          email: 'regular@example.com',
          password: '$2b$10$iB0/u9HHQFVo.wMRkmY5E.TfZtdxZsJ5lBrHIIXrsgIYGeAtHU306',
        },
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: '$2b$10$Rd6iPXGPx60WIt4XacCya.6JYLsKl9pWk0.jbhHBsMElNGgfs7AlS',
          role: 'ADMIN', // Assigning admin role
        },
      ],
    });

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
