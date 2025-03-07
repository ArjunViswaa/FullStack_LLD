const express = require("express");

// create an express app
const app = express();
app.use(express.json()); // change in line 5

// Logger Middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);
    next();
}

app.use(loggerMiddleware);

// define a route on the app
app.get("/", (req, res) => {
    res.send("Hello World from Express");
});

app.get("/about", (req, res) => {
    res.send("About page");
});

// post request
app.post("/post", (req, res) => {
    res.send("Post request");
    console.log(req.body); // undefined - change in line 5 - shows request JSON in req.body
});

// substitute for a database
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
];

// POST endpoint to create a new user
app.post("/users", (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.status(201).json({message: "User created", user});
});

// delete user
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({message: "User not found"});
    }
    users.splice(userIndex, 1);
    res.json({message: "User deleted"});
});

// Get the list of users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// Get User by ID
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if(!user) {
        return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(user);
});

// Not found
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});