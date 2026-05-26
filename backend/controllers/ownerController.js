const db = require("../config/db");

// Get all ratings for owner's stores
exports.getOwnerRatings = (req, res) => {
    const owner_id = req.user.id;

    const sql = `
        SELECT 
            s.name AS store_name,
            u.name AS user_name,
            u.email,
            r.rating
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.store_id
        LEFT JOIN users u ON r.user_id = u.id
        WHERE s.owner_id = ?
        ORDER BY s.name, r.rating DESC
    `;

    db.query(sql, [owner_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching ratings" });
        }

        res.json(result);
    });
};

// Get average rating per store
exports.getOwnerStoreStats = (req, res) => {
    const owner_id = req.user.id;

    const sql = `
        SELECT 
            s.id,
            s.name,
            IFNULL(AVG(r.rating), 0) AS avg_rating
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.store_id
        WHERE s.owner_id = ?
        GROUP BY s.id, s.name
        ORDER BY s.name
    `;

    db.query(sql, [owner_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error fetching stats" });
        }

        res.json(result);
    });
};