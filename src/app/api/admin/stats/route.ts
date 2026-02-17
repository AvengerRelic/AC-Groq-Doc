import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    const session = await auth();

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const totalUsers = await prisma.user.count();
        const activeUsers = await prisma.user.count({ where: { status: "APPROVED" } });
        const pendingUsers = await prisma.user.count({ where: { status: "PENDING" } });

        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            stats: {
                total: totalUsers,
                active: activeUsers,
                pending: pendingUsers
            },
            users
        });
    } catch (error) {
        console.error("Failed to fetch admin stats:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
