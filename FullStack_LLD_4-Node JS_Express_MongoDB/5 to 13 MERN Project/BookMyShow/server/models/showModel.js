const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        ticketPrice: {
            type: Number,
            required: true,
        },
        totalSeats: {
            type: Number,
            required: true,
        },
        bookedSeats: {
            type: Array,
            default: [],
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "bmsmovies",
            required: true,
        },
        theatre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "bmstheatres",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const show = mongoose.model("bmsshows", showSchema);
module.exports = show;