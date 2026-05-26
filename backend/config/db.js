const mysql = require("mysql2");

// Create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",        
    password: "Virendr@2001",   
    database: "storeapp" 
});

// Connect to DB
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

module.exports = db;