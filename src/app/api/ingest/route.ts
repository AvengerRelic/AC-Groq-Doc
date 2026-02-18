import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getEmbedding } from "@/lib/ai";
import { auth } from "@/auth";
import pdf from "pdf-parse";

// Allow Vercel functions to run for up to 60 seconds (Hobby plan limit is 10s default)
export const maxDuration = 60;

export async function POST(req: NextRequest) {
    console.log("Ingest API called");
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            console.log("Unauthorized: No valid session");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = session.user.id;

        const formData = await req.formData();
        const file = formData.get("file") as File;

        console.log("File received:", file?.name, "Size:", file?.size);
        console.log("User ID from session:", userId);
        if (!file) {
            return NextResponse.json({ error: "File is required" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Use pdf-parse for reliable serverless execution
        const data = await pdf(buffer);
        const text = data.text;

        // Create File record
        const fileRecord = await prisma.file.create({
            data: {
                userId,
                name: file.name,
                url: "internal", // Placeholder for local/internal storage
            },
        });
        console.log("File record created:", fileRecord.id);

        // Split text into 800-char chunks with 100-char overlap
        const chunks: string[] = [];
        const chunkSize = 800;
        const overlap = 100;

        for (let i = 0; i < text.length; i += chunkSize - overlap) {
            chunks.push(text.slice(i, i + chunkSize));
        }

        // Process chunks: Get embeddings and save
        for (const [index, content] of chunks.entries()) {
            const embedding = await getEmbedding(content);
            const embeddingSql = `[${embedding.join(",")}]`;

            // Use raw SQL for vector insertion
            await prisma.$executeRawUnsafe(
                `INSERT INTO "FileChunk" ("id", "fileId", "content", "embedding") VALUES ($1, $2, $3, $4::vector)`,
                crypto.randomUUID(),
                fileRecord.id,
                content,
                embeddingSql
            );
        }

        return NextResponse.json({ success: true, fileId: fileRecord.id });
    } catch (error: any) {
        console.error("Ingestion error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
