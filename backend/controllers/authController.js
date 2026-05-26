const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "secretkey";

// Signup
exports.signup = async (req, res) => {
    const { name, email, password, address } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (name, email, password, address, role)
            VALUES (?, ?, ?, ?, 'user')
        `;

        db.query(sql, [name, email, hashedPassword, address], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Signup failed" });
            }

            res.json({ message: "User registered successfully" });
        });

    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

// Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error" });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            role: user.role
        });
    });
};

// Update Password
exports.updatePassword = async (req, res) => {
    const { newPassword } = req.body;
    const user_id = req.user.id;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10); // ✅ IMPORTANT

        db.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [hashedPassword, user_id],
            (err) => {
                if (err) return res.status(500).send("Error");
                res.send("Password updated");
            }
        );

    } catch (err) {
        res.status(500).send("Error");
    }
};