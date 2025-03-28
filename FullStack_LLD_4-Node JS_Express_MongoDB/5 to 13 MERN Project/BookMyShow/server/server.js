const express = require('express');
const app = express();

require('dotenv').config(); // Load Environment variables

const connectDB = require("./config/db"); // Import database configurations
const userRouter = require('./routes/userRoutes'); // Import user routes
const movieRouter = require('./routes/movieRoutes'); // Import movie routes
const theatreRouter = require('./routes/theatreRoutes'); // Import theatre routes
const showRouter = require("./routes/showRoutes"); // Import  show routes

connectDB(); // Connect to database

/* Routes */
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatres', theatreRouter);
app.use('/api/shows', showRouter);

app.listen(8082, () => {
    console.log("Server is running...");
});