const express = require("express");
const app = express();
const userRoutes = require("./routes/users");

// Read env variables
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// session id on server session cookie on client
const session = require("express-session");

// cors package prevents CORS errors when using client side API calls
const cors = require("cors");

// add http headers, small layer of security
const helmet = require("helmet");

// log http requests
const logger = require("morgan");

// instantiate Passport and Github Strategy
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const passportConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
};

app.use(express.json());

// initialize HTTP Headers middleware
app.use(helmet());

// morgan logger, network info in node console
app.use(logger("dev"));

// enable cors
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

// =========== Passport Config ============
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());

// passport.session middleware explanation
// https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do
app.use(passport.session());

// initialize google strategy middleware
// http://www.passportjs.org/packages/passport-google-oauth2/
passport.use(
    new GoogleStrategy(passportConfig, function (
        _accessToken,
        _refreshToken,
        profile,
        cb
    ) {
        // console.log('Github Callback: ', profile);
        // this profile will get saved in express session
        return cb(null, profile);
    })
);

// serializeUser and deserializeUser explanation:
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});
// =========================================

// Routes
app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
