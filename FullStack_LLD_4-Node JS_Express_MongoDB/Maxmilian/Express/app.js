const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({extended: false}));

// app.use((req, res, next) => {
//     console.log("In the middleware");
//     next(); // Allows the request to continue to the next middleware in line
// });

// app.use((req, res, next) => {
//     console.log("In another middleware");
//     res.send('<h1>Hello from Express</h1>');
// });

// Moved to routes/admin.js
// app.use("/add-product", (req, res, next) => {
//     res.send("<form action='/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>");
// });

// app.post("/product", (req, res, next) => {
//     console.log(req.body);
//     res.redirect("/");
// });

app.use(express.static(path.join(__dirname, 'public')));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
})

// Moved to routes/shop.js
// app.use("/", (req, res, next) => {
//     console.log("In the middleware");
//     res.send('<h1>Hello from Express</h1>');
// });

// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);