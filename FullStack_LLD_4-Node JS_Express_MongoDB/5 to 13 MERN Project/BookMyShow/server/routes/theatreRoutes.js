const router = require("express").Router();
const { addTheatre, updateTheatre, deleteTheatre, getTheatresForOwner, getAllTheatres } = require("../controllers/theatreController");

// Get all theatres
router.get("/get-all-theatres", getAllTheatres);

// Get theatres by owner Id
router.get("/get-all-theatres-by-owner/:ownerId", getTheatresForOwner);

// Add a theatre
router.post("/add-theatre", addTheatre);

// Update theatre
router.put("/update-theatre", updateTheatre);

// Delete theatre
router.delete("/delete-theatre/:theatreId", deleteTheatre);

module.exports = router;