import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@nexdash.com';
    const password = 'admin123'; // Plain text as per auth.ts logic

    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                role: 'ADMIN',
                status: 'APPROVED',
                password: password,
            },
            create: {
                email,
                password,
                role: 'ADMIN',
                status: 'APPROVED',
            },
        });
        console.log(`Admin user created/updated: ${user.email}`);
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
