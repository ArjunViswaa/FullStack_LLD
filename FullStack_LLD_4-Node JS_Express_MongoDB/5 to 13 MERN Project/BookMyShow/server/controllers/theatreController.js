const Theatre = require("../models/theatreModel");

const addTheatre = async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
            success: true,
            message: "New theatre has been added!",
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

const updateTheatre = async (req, res) => {
    try {
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
        // console.log(req.body.theatreId)
        res.send({
            success: true,
            message: "Theatre has been updated!",
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

const deleteTheatre = async (req, res) => {
    try {
        console.log("deleting theatre", req.params.theatreId);
        await Theatre.findByIdAndDelete(req.params.theatreId);
        res.send({
            success: true,
            message: "The theatre has been deleted!",
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

// Get the theatres of a specific owner
const getTheatresForOwner = async (req, res) => {
    try {
        const allTheatres = await Theatre.find({ owner: req.params.ownerId });
        res.send({
            success: true,
            message: "All theatres fetched successfully!",
            data: allTheatres,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

// Get all theatres
const getAllTheatres = async (req, res) => {
    try {
        const allTheatres = await Theatre.find().populate("owner");
        res.send({
            success: true,
            message: "All Theatres fetched!",
            data: allTheatres
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    addTheatre,
    updateTheatre,
    deleteTheatre,
    getAllTheatres,
    getTheatresForOwner
}