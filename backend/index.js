const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Server running");
});

// DB Test route
app.get("/test-db", (req, res) => {
    db.query("SELECT 1", (err, result) => {
        if (err) {
            return res.status(500).send("DB Error");
        }
        res.send("Database connected successfully");
    });
});

app.get("/check", (req, res) => {
    res.send("check working");
});

//Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/owner", ownerRoutes);

const { verifyToken, isAdmin } = require("./middleware/authMiddleware");

app.get("/admin-test", verifyToken, isAdmin, (req, res) => {
    res.send("Admin route working");
});


//Start server
app.listen(5000, () => {
    console.log("Server started on port 5000");
});