const express = require("express");
const app = express();
const userRoutes = require("./routes/users");

// Read env variables
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
