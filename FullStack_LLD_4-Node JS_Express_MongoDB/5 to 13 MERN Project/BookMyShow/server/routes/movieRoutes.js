const movieRouter = require("express").Router();
const { addMovie, getAllMovies, updateMovie, deleteMovie } = require("../controllers/movieController");

// Add a movie...
movieRouter.post("/add-movie", addMovie);
movieRouter.get("/get-all-movies", getAllMovies);
movieRouter.put("/update-movie", updateMovie);
movieRouter.put("/delete-movie", deleteMovie);

module.exports = movieRouter;