const express = require('express');
const Path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.send(`
            <html>
                <head><title>Home Page</title></head>
                <body><h1>Welcome to the Home Page</h1></body>
            </html>
        `);
});

app.get('/about', (req, res) => {
    res.send(`
            <html>
                <head><title>About Page</title></head>
                <body><h1>About Us</h1><p>This is the about page.</p></body>
            </html>
        `);
});

app.get('/sendImage', (req, res) => {
    res.sendFile(Path.join(__dirname, 'public', 'claim.pdf'));
});

app.listen(3000, () => {
    console.log('Express server is listening on port http://localhost:3000');
});


