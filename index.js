const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/database");

const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

const user = require("./route/user");

app.use("/api/v1", user);

// CORS Configuration
app.listen(PORT, () => {
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

dbConnect();

app.get("/", (req, res) => {
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});
