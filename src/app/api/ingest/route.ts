import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getEmbedding } from "@/lib/ai";
const pdf = require("pdf-parse");

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const userId = formData.get("userId") as string;

        if (!file || !userId) {
            return NextResponse.json({ error: "File and User ID are required" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
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

        // Split text into 800-char chunks with 100-char overlap
        const chunks: string[] = [];
        const chunkSize = 800;
        const overlap = 100;

        for (let i = 0; i < text.length; i += chunkSize - overlap) {
            chunks.push(text.slice(i, i + chunkSize));
        }

        // Process chunks: Get embeddings and save
        for (const content of chunks) {
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
