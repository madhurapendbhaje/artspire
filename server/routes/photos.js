const express = require("express");
const router = express.Router();
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const knex = require("../knexConfig");

router.post("/", (req, res) => {
    console.log(req.body);
    const photoObj = {
        id: uuidv4(),
        url: req.body.url,
        category: req.body.category,
    };
    knex("photos")
        .insert(photoObj)
        .then(() => {
            return res.status(201).send("Saved to photos");
        })
        .catch((_err) => res.status(400).send("Could not save the photo"));
});

module.exports = router;
