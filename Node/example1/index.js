const fs = require('fs');

// fs.readFile('./demo.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     } else {
//         console.log('File contents:', data);
//     }
// });
// console.log('Read operation initiated.');

// const demoData = fs.readFileSync('./demo.txt', 'utf8');
// console.log('Synchronous read contents:', demoData);

// fs.appendFileSync('./demo.txt', '\nAppended some data synchronously.', 'utf8');
// const updatedData = fs.readFileSync('./demo.txt', 'utf8');
// console.log('Updated file contents after append:\n', updatedData);

fs.mkdirSync('./dist');
fs.writeFileSync('dist/index.html', 
    `<html>
        <head><title>Demo</title></head>
        <body><h1>Hello, World!</h1></body>
    </html>`, 'utf8'
);
const indexHtml = fs.readFileSync('dist/index.html', 'utf8');
console.log('Created index.html with contents:\n', indexHtml);