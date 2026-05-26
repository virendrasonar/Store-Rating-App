// imports
const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { addOrUpdateRating } = require("../controllers/ratingController");

// routes
router.post("/add", verifyToken, addOrUpdateRating);

module.exports = router;