const express = require("express");
const router = express.Router();
const passport = require("passport");

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
        successRedirect: "http://localhost:3000/users",
        failureRedirect: "http://localhost:3000/users/loginFailed",
    })
);

// endpoint for checking user's auth status
router.get("/check-auth", (req, res) => {
    if (req.user === undefined) return res.status(401).send("Unauthorized");
    // if user is currently authenticated, send back user info
    res.status(200).json(req.user);
});

module.exports = router;
