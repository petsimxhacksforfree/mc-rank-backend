const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Backend is running ✔");
});

app.get("/give-rank", (req, res) => {
  res.send("Endpoint alive ✔ (RCON temporarily disabled)");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
