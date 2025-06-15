const express = require("express");
const user = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// @route POST api/user/register
// @desc Register a new user
// @access Public

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Registration logic placeholder
        res.send({ name, email, password });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
