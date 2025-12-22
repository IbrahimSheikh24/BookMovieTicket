const httpp = require('http');

// const server = httpp.createServer((req, res) => {
//     res.write('Hello from Node.js server!');
//     res.write(' This is a simple HTTP server.');
//     res.end();
// })


// server.listen(3000, () => {
//     console.log('Server is listening on port http://localhost:3000');
// });

const serverWithRequest = httpp.createServer((req, res) => {
    if(req.url === '/') {
        
            <html>
                <head><title>Home Page</title></head>
                <body><h1>Welcome to the Home Page</h1></body>
            </html>
        `);
        res.end();
        return;
    }
    if(req.url === '/about') {
        res.write(`
            <html>
                <head><title>About Page</title></head>
                <body><h1>About Us</h1><p>This is the about page.</p></body>
            </html>
        `);
        res.end();
        return;
    }
    if(req.url === '/api/products') {
        const products = [{
            id: 1, name: 'Product 1', price: 100
        }, {
            id: 2, name: 'Product 2', price: 150
        },
        {
                id: 3, name: 'Product 3', price: 200
        }];
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(products));
        return;
    }


    res.write(`<html>
                <head><title>Not Found</title></head>
                <body><h1>404</h1><p>Page not found.</p></body>
            </html>`)
});

serverWithRequest.listen(4000, () => {
    console.log('Server with request handling is listening on port http://localhost:4000');
});

