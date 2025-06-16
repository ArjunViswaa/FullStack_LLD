const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === "/") {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First page</title></head>');
        // res.write('<body><h1>Hello again welcome to the assessment</h1></body>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form></body>');
        res.write('<html>');
        return res.end();
    }
    if(url === "/create-user" && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(username);
            return res.end();
        });
    }
    // console.log(url);
    if(url == "/users") {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>List of Users</title></head>');
        res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li><li>User 5</li><li>User 1</li></ul></body>');
        res.write('<html>');
        return res.end();
    }
}

module.exports = {
    handler: requestHandler
}