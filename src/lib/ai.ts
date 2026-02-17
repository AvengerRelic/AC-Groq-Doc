import { Groq } from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function getEmbedding(text: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
        const result = await model.embedContent(text);
        return result.embedding.values;
    } catch (error) {
        console.error("AI Embedding Failed (using mock):", error);
        // Return mock 768-dimensional vector
        return Array(768).fill(0).map(() => Math.random());
    }
}

export async function getGroqCompletion(prompt: string, context: string) {
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant. Use the provided context to answer the user's question. If the answer is not in the context, say you don't know.",
            },
            {
                role: "user",
                content: `Context: ${context}\n\nQuestion: ${prompt}`,
            },
        ],
        model: "llama3-8b-8192",
    });

    return completion.choices[0]?.message?.content || "";
}
