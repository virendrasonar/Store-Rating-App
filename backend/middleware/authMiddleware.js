const jwt = require("jsonwebtoken");

const SECRET = "secretkey";

//Verify token
exports.verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // attach user info
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

//Admin only
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};

//Normal user only
exports.isUser = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(403).json({ message: "User access required" });
    }
    next();
};

//Store owner only
exports.isOwner = (req, res, next) => {
    if (req.user.role !== "owner") {
        return res.status(403).json({ message: "Owner access required" });
    }
    next();
};