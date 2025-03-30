const express = require('express');
const app = express();

require('dotenv').config(); // Load Environment variables

const connectDB = require("./config/db"); // Import database configurations
const userRouter = require('./routes/userRoutes'); // Import user routes
const movieRouter = require('./routes/movieRoutes'); // Import movie routes
const theatreRouter = require('./routes/theatreRoutes'); // Import theatre routes
const showRouter = require("./routes/showRoutes"); // Import  show routes
const bookingRouter = require("./routes/bookingRoutes");
const auth = require("./middlewares/authMiddleware");

connectDB(); // Connect to database

/* Routes */
app.use(express.json());
app.use('/api/users', userRouter);
app.use("/api/movies", auth, movieRouter);
app.use("/api/theatres", auth, theatreRouter);
app.use("/api/shows", auth, showRouter);
app.use("/api/bookings", auth, bookingRouter);

app.listen(8082, () => {
    console.log("Server is running...");
});