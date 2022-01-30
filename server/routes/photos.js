const express = require("express");
const router = express.Router();
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const knex = require("../knexConfig");

router.post("/", (req, res) => {
    const photoObj = {
        id: uuidv4(),
        url: req.body.url,
        category: req.body.category,
    };
    knex("photos")
        .insert(photoObj)
        .then(() => {
            const userPhotoObj = {
                id: uuidv4(),
                user_id: req.body.user_id,
                photo_id: photoObj.id,
            };
            knex("user_photo")
                .insert(userPhotoObj)
                .catch((_err) =>
                    res.status(500).send("Could not save to favorites")
                );
            return res.status(201).send("Saved to photos");
        })
        .catch((_err) => res.status(400).send("Could not save the photo"));
});

module.exports = router;
