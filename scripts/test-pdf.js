const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

async function testPdf() {
    console.log("Testing pdfjs-dist...");

    // Minimal valid PDF binary data
    const pdfBuffer = Buffer.from(
        "%PDF-1.0\n1 0 obj\n<</Type/Catalog/Pages 2 0 R>>\nendobj\n2 0 obj\n<</Type/Pages/Kids[3 0 R]/Count 1>>\nendobj\n3 0 obj\n<</Type/Page/MediaBox[0 0 3 3]/Parent 2 0 R/Resources<<>>/Contents 4 0 R>>\nendobj\n4 0 obj\n<</Length 21>>\nstream\nBT\n/F1 12 Tf\n1 0 0 1 1 1 Tm\n(Hello World)Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000010 00000 n\n0000000060 00000 n\n0000000117 00000 n\n0000000216 00000 n\ntrailer\n<</Size 5/Root 1 0 R>>\nstartxref\n288\n%%EOF"
    );

    try {
        const data = new Uint8Array(pdfBuffer);
        const loadingTask = pdfjsLib.getDocument({ data });
        const pdfDocument = await loadingTask.promise;
        console.log(`PDF Loaded! Pages: ${pdfDocument.numPages}`);

        const page = await pdfDocument.getPage(1);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(item => item.str).join(" ");
        console.log("Text content:", text);
    } catch (error) {
        console.error("PDF Parse Failed full error:", error);
    }
}

testPdf();
