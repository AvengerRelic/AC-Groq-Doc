async function main() {
    const fileId = 'cmlqhb33b0000noa9i1wowd2d';
    const question = 'What is the summary of this document?';

    console.log('Testing Chat API...');
    try {
        const res = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileId, question }),
        });

        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Response:', text);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

main();
