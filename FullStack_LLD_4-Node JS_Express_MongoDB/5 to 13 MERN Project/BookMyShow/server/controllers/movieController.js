const Movies = require("../models/movieModel");

const addMovie = async (req, res) => {
    try {
        const newMovie = new Movies(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: "New movie has been added!"
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
};

const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movies.find();
        res.send({
            success: true,
            message: "All movies has been fetched",
            data: allMovies
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
};

const updateMovie = async (req, res) => {
    try {
        await Movies.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({
            success: true,
            message: "Movie updated",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

const deleteMovie = async (req, res) => {
    try {
        await Movies.findByIdAndDelete(req.body.movieId);
        console.log(req.body.movieId);
        res.send({
            success: true,
            message: "The movie has been deleted!",
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id);
        res.send({
            success: true,
            message: "Movie fetched successfully!",
            data: movie,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    addMovie,
    getAllMovies,
    updateMovie,
    deleteMovie,
    getMovieById,
};