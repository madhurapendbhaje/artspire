const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const knex = require("../knexConfig");

/**
 * If photos already marked as 'liked', and same photo encountered again,
 * mark it as 'disliked' and remove from user-photo relation table
 * If not, add it to user-photo relation table
 */
router.post("/", (req, res) => {
    knex("photos")
        .where({ url: req.body.url })
        .then((response) => {
            if (response.length === 0) {
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
                            .then(() => {
                                return res
                                    .status(201)
                                    .send("Saved to favorites");
                            })
                            .catch((_err) => {
                                return res
                                    .status(500)
                                    .send("Could not save to favorites");
                            });
                    })
                    .catch((err) => {
                        return res.status(500).send(err);
                    });
            } else {
                knex("photos")
                    .del()
                    .where({ url: req.body.url })
                    .then((_res) => {
                        knex("user_photo")
                            .del()
                            .where({ photo_id: response[0].id })
                            .then(() => {
                                return res
                                    .status(201)
                                    .send("Removed from favorites");
                            })
                            .catch((err) => {
                                return res.status(500).send(err);
                            });
                    })
                    .catch((_err) => {
                        return res
                            .status(500)
                            .send("Could not remove from favorites");
                    });
            }
        })
        .catch((_err) => {
            return res.status(500).send("Could not process the photo");
        });
});

module.exports = router;
