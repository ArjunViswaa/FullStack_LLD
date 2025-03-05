const http = require('http');

const server = http.createServer((req, res) => {
    // set response header
    res.setHeader('Content-Type', 'text/html'); // MIME type

    // Write a response to the client
    // res.write('Hello World');

    res.write("<head><title>My First Node App</title></head>");
    res.write("<body><h1>Hello World from Nodemon</h1></body>");

    res.end(); // end the response
});

const port = 3000;
const hostname = 'localhost';
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});