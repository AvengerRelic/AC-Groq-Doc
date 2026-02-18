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

// Import dependencies for Ingest & Chat
import { getEmbedding, getGroqCompletion, getHuggingFaceCompletion } from "@/lib/ai";
const pdf = require("pdf-parse");

export async function ingestDocument(formData: FormData) {
    // ... (unchanged ingest code) ...
    console.log("Server Action: ingestDocument started");
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            return { error: "Unauthorized" };
        }
        const userId = session.user.id;

        const file = formData.get("file") as File;
        if (!file) {
            return { error: "No file provided" };
        }

        console.log(`Server Action: Processing file ${file.name} (${file.size} bytes)`);
        const buffer = Buffer.from(await file.arrayBuffer());

        // Parse PDF
        const data = await pdf(buffer);
        const text = data.text;

        if (!text || text.length < 10) {
            return { error: "PDF extraction failed: No text found" };
        }

        // Create File record
        const fileRecord = await prisma.file.create({
            data: {
                userId,
                name: file.name,
                url: "internal",
            },
        });

        // Chunking
        const chunks: string[] = [];
        const chunkSize = 800;
        const overlap = 100;

        for (let i = 0; i < text.length; i += chunkSize - overlap) {
            chunks.push(text.slice(i, i + chunkSize));
        }

        console.log(`Server Action: Generated ${chunks.length} chunks. Embedding...`);

        // Embed & Save
        for (const content of chunks) {
            const embedding = await getEmbedding(content);
            const embeddingSql = `[${embedding.join(",")}]`;

            await prisma.$executeRawUnsafe(
                `INSERT INTO "FileChunk" ("id", "fileId", "content", "embedding") VALUES ($1, $2, $3, $4::vector)`,
                crypto.randomUUID(),
                fileRecord.id,
                content,
                embeddingSql
            );
        }

        revalidatePath("/dashboard/user/knowledgebase");
        return { success: true, fileId: fileRecord.id };
    } catch (error: any) {
        console.error("Ingest Action Error:", error);
        return { error: error.message || "Ingestion failed" };
    }
}

export async function getChatResponse(fileId: string, question: string, deepSearch: boolean) {
    try {
        console.log(`Server Action: Chat request for file ${fileId}`);
        const session = await auth();
        if (!session || !session.user?.id) return { error: "Unauthorized" };

        if (!question || !fileId) return { error: "Missing required fields" };

        // 1. Embed question
        const questionEmbedding = await getEmbedding(question);
        const embeddingSql = `[${questionEmbedding.join(",")}]`;

        // 2. Vector Search
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
            return { answer: "I couldn't find any relevant information in that file." };
        }

        // 3. Context & Completion
        const context = chunks.map(c => c.content).join("\n\n---\n\n");
        const systemPrompt = deepSearch
            ? "You are an expert analyst. Provide a detailed, comprehensive answer based STRICTLY on the context. Explain your reasoning and cite specific details."
            : "You are a helpful assistant. Answer concisely based on the context. If the answer is not in the context, say you don't know.";

        let answer = "";
        try {
            // Try Groq first (Primary)
            console.log("Chat Action: Attempting Groq...");
            answer = await getGroqCompletion(question, context, systemPrompt);
        } catch (groqError) {
            console.warn("Chat Action: Groq failed, failing over to Hugging Face...", groqError);
            try {
                // Fallback to Hugging Face (Secondary)
                answer = await getHuggingFaceCompletion(question, context, systemPrompt);
                answer += "\n\n(Generated via Fallback AI)";
            } catch (hfError) {
                console.error("Chat Action: Both AI providers failed.");
                return { error: "AI Service Unavailable. Please check API keys." };
            }
        }

        return { answer };

    } catch (error: any) {
        console.error("Chat Action Error:", error);
        return { error: error.message || "Chat failed" };
    }
}
