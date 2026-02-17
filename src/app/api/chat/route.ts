import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getEmbedding, getGroqCompletion } from "@/lib/ai";

export async function POST(req: NextRequest) {
    try {
        const { question, fileId } = await req.json();

        if (!question || !fileId) {
            return NextResponse.json({ error: "Question and File ID are required" }, { status: 400 });
        }

        // 1. Embed the question
        const questionEmbedding = await getEmbedding(question);
        const embeddingSql = `[${questionEmbedding.join(",")}]`;

        // 2. Perform vector similarity search
        // Using <=> for cosine distance (smaller is better)
        const chunks: any[] = await prisma.$queryRawUnsafe(
            `SELECT content FROM "FileChunk" 
             WHERE "fileId" = $1 
             ORDER BY embedding <=> $2::vector 
             LIMIT 3`,
            fileId,
            embeddingSql
        );

        if (!chunks || chunks.length === 0) {
            return NextResponse.json({ answer: "I couldn't find any relevant information in that file." });
        }

        // 3. Assemble context
        const context = chunks.map(c => c.content).join("\n\n---\n\n");

        // 4. Get completion from Groq
        const answer = await getGroqCompletion(question, context);

        return NextResponse.json({ answer });
    } catch (error: any) {
        console.error("Chat error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
