const express = require("express");
const router = express.Router();

const { addStore } = require("../controllers/adminController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const { getDashboard } = require("../controllers/adminController");
const { getUsers, deleteUser } = require("../controllers/adminController");


// Admin-only route
router.post("/add-store", verifyToken, isAdmin, addStore);
router.get("/dashboard", verifyToken, isAdmin, getDashboard);
router.get("/users", verifyToken, isAdmin, getUsers);
router.delete("/users/:id", verifyToken, isAdmin, deleteUser);

module.exports = router;