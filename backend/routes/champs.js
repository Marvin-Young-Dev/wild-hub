const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// gebe alle champions aus die in der db sind champs
// Route http://localhost:9000/api/champions

/**
 * GET /api/champions
 * Retrieves all champions from the database.
 * Requires authentication.
 *
 * Request Headers:
 *  - Authorization: Bearer token
 *
 * Response:
 *  - 200: A JSON array of champion objects.
 *  - 500: If an error occurs while fetching from the database.
 */
router.get("/champions", auth, (req, res) => {
    const user_id = req.user.id;
    db.all("SELECT * FROM champions", (err, rows) => {
        if (err) return res.status(500).send("Something went wrong . Please try again");
        res.status(200).json(rows);
    });
});

module.exports = router;
