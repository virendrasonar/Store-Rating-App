const db = require("../config/db");

//Get all stores
exports.getStores = (req, res) => {
    const sql = `
       SELECT 
    s.id,
    s.name,
    s.address,
    IFNULL(AVG(r.rating), 0) AS rating,
    MAX(CASE WHEN r.user_id = ? THEN r.rating END) AS user_rating
FROM stores s
LEFT JOIN ratings r ON s.id = r.store_id
GROUP BY s.id, s.name, s.address
    `;

    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error fetching stores" });
        }

        res.json(result);
    });
};

//Search stores
exports.searchStores = (req, res) => {
    const { search } = req.query;

    //Validation
    if (!search || search.trim() === "") {
        return res.status(400).json({ message: "Search text required" });
    }

    const sql = `
        SELECT 
            s.id, 
            s.name, 
            s.address,
            IFNULL(AVG(r.rating), 0) AS rating
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.store_id
        WHERE LOWER(s.name) LIKE LOWER(?) 
           OR LOWER(s.address) LIKE LOWER(?)
        GROUP BY s.id, s.name, s.address
    `;

    const value = `%${search}%`;

    db.query(sql, [value, value], (err, result) => {
        if (err) {
            console.error("Search Error:", err);
            return res.status(500).json({ message: "Search failed" });
        }

        res.status(200).json(result);
    });
};

//Add store (Admin only)
exports.addStore = (req, res) => {
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).json({ message: "Name and address required" });
    }

    const sql = `
        INSERT INTO stores (name, address)
        VALUES (?, ?)
    `;

    db.query(sql, [name, address], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to add store" });
        }

        res.status(201).json({ message: "Store added successfully" });
    });
};
