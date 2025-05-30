const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// gebe alle ranked matches aus die in der db sind ranked_matches
// Route http://localhost:9000/api/ranked_matches

router.get("/ranked_raw_matches", auth, (req, res) => {
    const user_id = req.user.id;
    db.all("SELECT * FROM ranked_raw", (err, rows) => {
        if (err) return res.status(500).send("Something went wrong . Please try again");
        res.status(200).json(rows);
    });
});

module.exports = router;
