const db = require("../config/db");

//Add or Update Rating
exports.addOrUpdateRating = (req, res) => {
    const { store_id, rating } = req.body;
    const user_id = req.user.id;

    //Validation
    if (!store_id || !rating) {
        return res.status(400).json({ message: "Store ID and rating required" });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    //Check if rating exists
    const checkSql = `
        SELECT id FROM ratings 
        WHERE user_id = ? AND store_id = ?
    `;

    db.query(checkSql, [user_id, store_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error checking rating" });
        }

        //UPDATE if exists
        if (result.length > 0) {
            const updateSql = `
                UPDATE ratings 
                SET rating = ?
                WHERE user_id = ? AND store_id = ?
            `;

            db.query(updateSql, [rating, user_id, store_id], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Update failed" });
                }

                return res.status(200).json({ message: "Rating updated successfully" });
            });

        } else {
            //INSERT if not exists
            const insertSql = `
                INSERT INTO ratings (user_id, store_id, rating)
                VALUES (?, ?, ?)
            `;

            db.query(insertSql, [user_id, store_id, rating], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Insert failed" });
                }

                return res.status(201).json({ message: "Rating added successfully" });
            });
        }
    });
};