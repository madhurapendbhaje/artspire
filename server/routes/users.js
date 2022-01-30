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

// Update user profile
router.put("/:id", (req, res) => {
    const data = req.body;

    knex("users")
        .where({ id: req.params.id })
        .update({ proficiency_level: data.level })
        .catch((_err) => {
            return res.status(500).send("Could not save preferences");
        });

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
                    .then(() => {
                        knex("users")
                            .where({ id: req.params.id })
                            .update({ is_profile_complete: true })
                            .catch((_err) => {
                                return res
                                    .status(500)
                                    .send(
                                        "Could not save profile preferences."
                                    );
                            });
                    })
                    .catch((_err) => {
                        return res
                            .status(500)
                            .send("Could not save preferences");
                    });
            })
            .catch((_err) => {
                return res.status(500).send("Could not save preferences");
            });
    });

    res.send("User preferences saved");
});

router.get("/", (req, res) => {
    res.send("Test");
});
module.exports = router;
