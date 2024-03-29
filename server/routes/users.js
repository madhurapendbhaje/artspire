const express = require("express");
const router = express.Router();
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");

const knex = require("../knexConfig");

// create a login failure endpoint
router.get("/loginFailed", (_req, res) => {
    res.status(401).send("Could not authenticate with OAuth provider");
});

// create a login endpoint which kickstarts the auth process
router.get("/login", (req, res) => {
    // remember the current path user comes from for login to redirect back to it
    authRedirect = req.query.from;
    // start authenticating
    passport.authenticate("google", { scope: ["email", "profile"] })(req, res);
});

// logout path
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(req.query.from);
});

// Google Auth CallBack/Redirect http://localhost:3000/users/auth
router.get(
    "/auth",
    passport.authenticate("google", {
        successRedirect: "http://localhost:3000/users/profile",
        failureRedirect: "http://localhost:3000/users/loginFailed",
    })
);

// endpoint for checking user's auth status
router.get("/check-auth", (req, res) => {
    if (req.user === undefined) return res.status(401).send("Unauthorized");
    // if user is currently authenticated, send back user info
    res.status(200).json(req.user);
});

function getUserPhotos(userId) {
    let result = [];
    knex("user_photo")
        .join("photos", "photos.id", "user_photo.photo_id")
        .where({ user_id: userId })
        .then((response) => {
            result = response;
            return result;
        })
        .catch((_err) => {
            return result;
        });
}

// Get User details
router.get("/:id", (req, res) => {
    let userObj = {};
    knex("users")
        .where({ id: req.params.id })
        .then((response) => {
            userObj = { ...response[0] };
            knex("user_photo")
                .join("photos", "photos.id", "user_photo.photo_id")
                .where({ user_id: req.params.id })
                .then((response) => {
                    userObj.photos = response;
                    knex("user_tutorial")
                        .join(
                            "tutorials",
                            "tutorials.id",
                            "user_tutorial.tutorial_id"
                        )
                        .where({ user_id: req.params.id })
                        .then((response) => {
                            userObj.tutorials = response;
                            return res.send(userObj);
                        });
                });
        })
        .catch((_err) => res.status(404).send("User not found"));
});

// Get user's preferred mediums
router.get("/:id/mediums", (req, res) => {
    knex("user_medium")
        .join("medium", "medium.id", "user_medium.medium_id")
        .where({ user_id: req.params.id })
        .then((response) => {
            return res.send(response);
        })
        .catch((_err) =>
            res.status(404).send("Could not find user's preferred mediums")
        );
});

// Update user profile
router.put("/:id", (req, res) => {
    const data = req.body;

    knex("users")
        .where({ id: req.params.id })
        .update({ proficiency_level: data.level })
        .then(() => {})
        .catch((_err) => {
            return res.status(500).send("Could not save preferences");
        });

    knex("user_medium")
        .del()
        .where({ user_id: req.params.id })
        .then((_res) => {
            data.medium.forEach((medium) => {
                knex("medium")
                    .where({ medium_type: medium })
                    .then((response) => {
                        const mediumId = response[0].id;
                        const userMediumObj = {
                            id: uuidv4(),
                            user_id: req.params.id,
                            medium_id: mediumId,
                        };
                        knex("user_medium")
                            .insert(userMediumObj)
                            .then()
                            .catch((_err) => {
                                return res
                                    .send(500)
                                    .send("Could not save preferences");
                            });
                        // const userMediumObj = {
                        //     id: uuidv4(),
                        //     user_id: req.params.id,
                        //     medium_id: mediumId,
                        // };
                        // knex("user_medium")
                        //     .insert(userMediumObj)
                        //     .then(() => {
                        //         knex("users")
                        //             .where({ id: req.params.id })
                        //             .update({ is_profile_complete: true })
                        //             .catch((_err) => {
                        //                 return res
                        //                     .status(500)
                        //                     .send(
                        //                         "Could not save profile preferences."
                        //                     );
                        //             });
                        //     })
                        //     .catch((_err) => {
                        //         return res
                        //             .status(500)
                        //             .send("Could not save preferences");
                        //     });
                    })
                    .catch((_err) => {
                        return res
                            .status(500)
                            .send("Could not save preferences");
                    });
            });
        })
        .catch((_err) => {
            return res.status(500).send("Could not save preferences");
        });
    knex("users")
        .where({ id: req.params.id })
        .update({ is_profile_complete: true })
        .then(() => {
            res.send("User preferences saved");
        })
        .catch((_err) => {
            return res.status(500).send("Could not save profile preferences.");
        });
});

module.exports = router;
