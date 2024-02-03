fetch('https://emkc.org/api/v2/piston/execute',
    {
        method: 'POST',
        body: JSON.stringify({
            language: 'python',
            stdin: '',
            version: '3.10.0',
            files: [{ content: "print('Hello World')" }]
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
)
    .then(res => res.json())
    .then(data => console.log(data));