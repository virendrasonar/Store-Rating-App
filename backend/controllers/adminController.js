const db = require("../config/db");

// Add store
exports.addStore = (req, res) => {
    const { name, email, address, owner_id } = req.body;

    const sql = `
        INSERT INTO stores (name, email, address, owner_id)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, address, owner_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Failed to add store" });
        }

        res.json({ message: "Store added successfully" });
    });
};

// Admin dashboard
exports.getDashboard = (req, res) => {
    const queries = {
        users: "SELECT COUNT(*) AS count FROM users",
        stores: "SELECT COUNT(*) AS count FROM stores",
        ratings: "SELECT COUNT(*) AS count FROM ratings"
    };

    db.query(queries.users, (err, users) => {
        if (err) return res.status(500).send("Error");

        db.query(queries.stores, (err, stores) => {
            if (err) return res.status(500).send("Error");

            db.query(queries.ratings, (err, ratings) => {
                if (err) return res.status(500).send("Error");

                res.json({
                    users: users[0].count,
                    stores: stores[0].count,
                    ratings: ratings[0].count
                });
            });
        });
    });
};

// Get all users
exports.getUsers = (req, res) => {
    db.query("SELECT id, name, email, role FROM users", (err, result) => {
        if (err) return res.status(500).send("Error");
        res.json(result);
    });
};

// Delete user
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).send("Error");
        res.json({ message: "User deleted" });
    });
};