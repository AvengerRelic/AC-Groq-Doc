import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getEmbedding, getGroqCompletion } from "@/lib/ai";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Chat API Request Body:", body);
        const { question, fileId, deepSearch } = body;

        if (!question || !fileId) {
            console.error("Chat API Error: Missing question or fileId");
            return NextResponse.json({ error: "Question and File ID are required" }, { status: 400 });
        }

        // 1. Embed the question
        const questionEmbedding = await getEmbedding(question);
        const embeddingSql = `[${questionEmbedding.join(",")}]`;

        // 2. Perform vector similarity search
        // Deep Search: Retrieve MORE chunks (e.g., 10 instead of 3) for better context
        const limit = deepSearch ? 10 : 3;

        const chunks: any[] = await prisma.$queryRawUnsafe(
            `SELECT content FROM "FileChunk" 
             WHERE "fileId" = $1 
             ORDER BY embedding <=> $2::vector 
             LIMIT ${limit}`,
            fileId,
            embeddingSql
        );

        if (!chunks || chunks.length === 0) {
            return NextResponse.json({ answer: "I couldn't find any relevant information in that file." });
        }

        // 3. Assemble context
        const context = chunks.map(c => c.content).join("\n\n---\n\n");

        // 4. Get completion from Groq
        const systemPrompt = deepSearch
            ? "You are an expert analyst. Provide a detailed, comprehensive answer based STRICTLY on the context. Explain your reasoning and cite specific details."
            : "You are a helpful assistant. Answer concisely based on the context. If the answer is not in the context, say you don't know.";

        const answer = await getGroqCompletion(question, context, systemPrompt);

        return NextResponse.json({ answer });
    } catch (error: any) {
        console.error("Chat error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
