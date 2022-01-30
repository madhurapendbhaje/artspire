const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const knex = require("../knexConfig");

router.post("/", (req, res) => {
    const tutorialObj = {
        id: uuidv4(),
        url: req.body.url,
        category: req.body.category,
    };
    knex("tutorials")
        .insert(tutorialObj)
        .then(() => {
            const userTutorialObj = {
                id: uuidv4(),
                user_id: req.body.user_id,
                tutorial_id: tutorialObj.id,
            };
            console.log(userTutorialObj);
            knex("user_tutorial")
                .insert(userTutorialObj)
                .catch((err) => {
                    console.log(err);
                    res.status(500).send("Could not save to favorites");
                });
            return res.status(201).send("Saved to tutorials");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send("Could not save the tutorial");
        });
});

module.exports = router;
