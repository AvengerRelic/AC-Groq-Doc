import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from "@google/generative-ai";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { userId, text, url, type, outputOption } = await req.json();

        const apiKey = process.env.GOOGLE_API_KEY || "";
        const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });

        console.log(`Using Gemini model: ${modelName}`);

        if (!text && !url) {
            return NextResponse.json({ error: 'Content is required' }, { status: 400 });
        }

        const effectiveUserId = userId || 'guest-user';
        const contentToAnalyze = type === 'video' ? `Video URL: ${url}` : text;

        let promptPrefix = '';
        switch (outputOption) {
            case 'questions':
                promptPrefix = 'Generate 3 exam-focused questions with answers based on the following content:';
                break;
            case 'mcq':
                promptPrefix = 'Generate 3 multiple-choice questions (MCQs) with the correct answer indicated based on the following content:';
                break;
            case 'detailed':
                promptPrefix = 'Generate a detailed study note with introduction, core analysis, implications, and conclusion based on the following content:';
                break;
            case 'summary':
            default:
                promptPrefix = 'Generate a concise summary with key takeaways based on the following content:';
        }

        let generatedContent = '';
        try {
            const result = await model.generateContent(`${promptPrefix}\n\n${contentToAnalyze}`);
            const response = await result.response;
            generatedContent = response.text() || 'Failed to generate content.';
        } catch (aiError: any) {
            console.error('Google AI API Error:', aiError);

            let errorMessage = 'Summarization service error';
            let details = aiError.message || 'Google AI API failure';
            let status = 502;

            if (aiError.message?.includes('API_KEY_INVALID')) {
                errorMessage = 'Invalid API Key';
                details = 'The Google API key provided is invalid. Please check your .env file.';
                status = 401;
            } else if (aiError.message?.includes('quota')) {
                errorMessage = 'Quota Exceeded';
                details = 'Your Google AI API quota has been reached. Please check your billing/usage.';
                status = 429;
            }

            return NextResponse.json({
                error: errorMessage,
                details: details
            }, { status });
        }

        const title = type === 'video' ? 'Video Summary' : 'Text Summary';

        // Save to database (optional)
        try {
            await prisma.summary.create({
                data: {
                    userId: effectiveUserId,
                    type,
                    title: `${title} - ${new Date().toLocaleDateString()}`,
                    content: generatedContent,
                    original: type === 'video' ? url : text.substring(0, 100) + '...',
                },
            });
        } catch (dbError) {
            console.warn('Failed to save summary to database:', dbError);
        }

        return NextResponse.json({ content: generatedContent });
    } catch (error) {
        console.error('Summarization route error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
