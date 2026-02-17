require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

async function testEmbedding() {
    console.log("Testing Gemini API with NEW KEY...");
    const key = process.env.GOOGLE_API_KEY;
    if (!key) {
        console.error("Error: GOOGLE_API_KEY not found.");
        return;
    }
    console.log("API Key found:", key.substring(0, 5) + "...");

    const genAI = new GoogleGenerativeAI(key);

    // Clear log file
    fs.writeFileSync('error.log', `Test Run at ${new Date().toISOString()}\n\n`);

    // Test 1: Generation (gemini-1.5-flash)
    try {
        console.log("Test 1: Generation (gemini-1.5-flash)...");
        const modelGen = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await modelGen.generateContent("Say hello");
        console.log("Generation Success:", result.response.text());
        fs.appendFileSync('error.log', "Test 1 Success\n");
    } catch (error) {
        console.error("Test 1 Failed");
        fs.appendFileSync('error.log', `Test 1 Failed: ${JSON.stringify(error, null, 2)}\n`);
    }

    // Test 2: Embedding (text-embedding-004)
    try {
        console.log("Test 2: Embedding (text-embedding-004)...");
        const modelEmb = genAI.getGenerativeModel({ model: "text-embedding-004" });
        const result = await modelEmb.embedContent("Hello world");
        console.log("Embedding Success! Length:", result.embedding.values.length);
        fs.appendFileSync('error.log', "Test 2 Success\n");
    } catch (error) {
        console.error("Test 2 Failed");
        fs.appendFileSync('error.log', `Test 2 Failed: ${JSON.stringify(error, null, 2)}\n`);
    }

    // Test 3: Gemini Pro (gemini-pro)
    try {
        console.log("Test 3: Generation (gemini-pro)...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await modelPro.generateContent("Hello");
        console.log("Gemini Pro Success:", result.response.text());
        fs.appendFileSync('error.log', "Test 3 Success\n");
    } catch (error) {
        console.error("Test 3 Failed");
        fs.appendFileSync('error.log', `Test 3 Failed: ${JSON.stringify(error, null, 2)}\n`);
    }
}

testEmbedding();
