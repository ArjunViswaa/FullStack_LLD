const express = require("express");
const connectDB = require("./config/db");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Connect to database
connectDB();

// middlewares
app.use(express.json());

// routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the product API");
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(3000, () => {
    console.log(`The server is running in port 3000`);
});