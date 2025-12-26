Node.js is a JavaScript runtime environment that allows you to run JavaScript on the server side (not just in browsers). Its core objectives are:

- Run JavaScript outside the browser - Execute JavaScript on servers, computers, IoT devices, etc.
- Handle I/O operations efficiently - File reading, database queries, network requests (asynchronously/non-blocking)
- Build server-side applications - Web servers, APIs, microservices, real-time applications
- Event-driven architecture - Handle thousands of concurrent connections efficiently
- Client-server communication is one application of Node.js using the http module. 

✅ Creating REST APIs
✅ Reading/writing files
✅ Database operations
✅ Real-time applications (WebSockets)
✅ Command-line tools (CLI)
✅ Automation scripts
✅ Streaming data
✅ And much more...

Step by Step learning
1. file system
2. client-server communication
http.createServer() creates an HTTP server object in Node.js. It's a built-in function from the http module that sets up a server capable of receiving HTTP requests from clients (like web browsers).
3. Express
What is express?
Express is a web application framework for Node.js, designed for building web applications and APIs.
It provides a robust set of features for web and mobile applications.
Using express to create a simple web server. No need to create http server manually by using http.createServer.
Express simplifies the process of handling requests and responses by writting less boilerplate code.
We have "get" | "post" | "put" | "delete" | "patch" methods to handle different HTTP methods.

What is express()?
express() is a function that creates an Express application.
The app object returned by express() has methods for routing HTTP requests, configuring middleware, rendering HTML views, and registering a template engine.

- Authentication: A user provides their credentials (like email and password) to prove their identity. If the credentials are valid, the user is considered authenticated and can access protected resources.

- Authorization: After a user is authenticated, authorization determines what resources or actions the user is allowed to access. It checks the user's permissions and roles to ensure they have the right to perform specific actions or access certain data.

