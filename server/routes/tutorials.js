const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const knex = require("../knexConfig");

router.post("/", (req, res) => {
    knex("tutorials")
        .where({ url: req.body.url })
        .then((response) => {
            if (response.length === 0) {
                const tutorialObj = {
                    id: uuidv4(),
                    url: req.body.url,
                    title: req.body.title,
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
                        knex("user_tutorial")
                            .insert(userTutorialObj)
                            .then(() => {
                                return res
                                    .status(201)
                                    .send("Saved to favorites");
                            })
                            .catch((_err) => {
                                res.status(500).send(
                                    "Could not save to favorites"
                                );
                            });
                    })
                    .catch((_err) => {
                        return res
                            .status(500)
                            .send("Could not save to favorites");
                    });
            } else {
                knex("tutorials")
                    .del()
                    .where({ url: req.body.url })
                    .then((_res) => {
                        knex("user_tutorial")
                            .del()
                            .where({ tutorial_id: response[0].id })
                            .then(() => {
                                return res
                                    .status(201)
                                    .send("Removed from favorites");
                            })
                            .catch((_err) => {
                                return res
                                    .status(500)
                                    .send("Could not remove from favorites");
                            });
                    })
                    .catch();
            }
        })
        .catch((_err) => {
            return res.status(500).send("Could not process the video.");
        });
});

module.exports = router;
