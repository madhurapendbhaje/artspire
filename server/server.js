const express = require("express");
const app = express();

// Read env variables
require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
