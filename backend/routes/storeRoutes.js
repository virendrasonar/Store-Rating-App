const express = require("express");
const router = express.Router();
const { getStores } = require("../controllers/storeController");
const { verifyToken } = require("../middleware/authMiddleware");
const { searchStores } = require("../controllers/storeController");
const { addStore } = require("../controllers/storeController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");



router.get("/search", verifyToken, searchStores);
router.get("/all", verifyToken, getStores);
router.get("/search", verifyToken, searchStores);
router.post("/add", verifyToken, isAdmin, addStore);

module.exports = router;