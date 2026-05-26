const express = require("express");
const router = express.Router();

const {
  getOwnerRatings,
  getOwnerStoreStats
} = require("../controllers/ownerController");

const { verifyToken } = require("../middleware/authMiddleware");
const { verifyToken, isOwner } = require("../middleware/authMiddleware");

//Owner APIs
router.get("/ratings", verifyToken, isOwner, getOwnerRatings);
router.get("/stats", verifyToken, isOwner, getOwnerStoreStats);

module.exports = router;