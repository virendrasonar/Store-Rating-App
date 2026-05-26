const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

// test route
router.get("/test", (req, res) => {
    res.send("Auth route working");
});
router.post("/signup", signup);
router.post("/login", login);
router.put("/update-password", verifyToken, updatePassword);

module.exports = router;