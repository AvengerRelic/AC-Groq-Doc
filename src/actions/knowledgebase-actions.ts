"use server";

import prisma from "@/lib/db";
import { auth } from "@/auth"; // Correct auth import
import { revalidatePath } from "next/cache";

export async function getFiles() {
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            console.error("Server Action: Unauthorized fetch attempt");
            return [];
        }

        const userId = session.user.id;
        console.log(`Server Action: Fetching files for user ${userId}`);

        const files = await prisma.file.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                createdAt: true,
                url: true
            }
        });

        console.log(`Server Action: Found ${files.length} files.`);
        return files;
    } catch (error) {
        console.error("Server Action: Get Files Error", error);
        return [];
    }
}

export async function deleteFile(fileId: string) {
    try {
        const session = await auth();
        if (!session || !session.user?.id) return { error: "Unauthorized" };

        const userId = session.user.id;

        // Check ownership
        const file = await prisma.file.findUnique({
            where: { id: fileId },
        });

        if (!file || file.userId !== userId) {
            return { error: "File not found or access denied" };
        }

        // Delete chunks first (cascade might handle handled by DB, but safe to be explicit)
        await prisma.fileChunk.deleteMany({
            where: { fileId },
        });

        // Delete file record
        await prisma.file.delete({
            where: { id: fileId },
        });

        revalidatePath("/dashboard/user/knowledgebase");
        return { success: true };
    } catch (error) {
        console.error("Delete File Error:", error);
        return { error: "Failed to delete file" };
    }
}
