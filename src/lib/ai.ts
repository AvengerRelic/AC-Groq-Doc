import { Groq } from "groq-sdk";
import { HfInference } from "@huggingface/inference";
import { GoogleGenerativeAI } from "@google/generative-ai";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
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

export async function getGroqCompletion(prompt: string, context: string, systemPrompt: string = "You are a helpful assistant.") {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Context: ${context}\n\nQuestion: ${prompt}` },
            ],
            model: "llama-3.3-70b-versatile",
        });
        return completion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("Groq API Error:", error);
        throw error; // Rethrow to allow fallback
    }
}

export async function getHuggingFaceCompletion(prompt: string, context: string, systemPrompt: string = "You are a helpful assistant.") {
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.3",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Context: ${context}\n\nQuestion: ${prompt}` },
            ],
            max_tokens: 1024,
            temperature: 0.7,
        });
        return response.choices[0].message.content || "";
    } catch (error) {
        console.error("Hugging Face API Error:", error);
        throw error;
    }
}
