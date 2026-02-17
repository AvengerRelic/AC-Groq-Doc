import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Determine role based on email domain or specific address
        const role = email.includes('admin') ? 'admin' : 'user';

        // Find or create user
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    role,
                },
            });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal User Error' }, { status: 500 });
    }
}
