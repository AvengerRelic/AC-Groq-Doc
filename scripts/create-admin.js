const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Checking for admin users...');

    // Find existing admins
    const admins = await prisma.user.findMany({
        where: { role: 'ADMIN' },
    });

    if (admins.length > 0) {
        console.log('Found existing admin user(s):');
        admins.forEach(admin => {
            console.log(`- Email: ${admin.email}`);
            console.log(`  Password: ${admin.password} (Note: Might be hashed in prod, but cleartext here based on schema default)`);
        });
    } else {
        console.log('No admin found. Creating default admin...');
        const adminEmail = 'admin@nexdash.com';
        const adminPassword = 'admin123';

        const newAdmin = await prisma.user.create({
            data: {
                email: adminEmail,
                password: adminPassword,
                role: 'ADMIN',
                status: 'APPROVED',
                name: 'Admin User'
            },
        });

        console.log('Created default admin:');
        console.log(`- Email: ${newAdmin.email}`);
        console.log(`- Password: ${newAdmin.password}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
