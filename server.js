const express = require("express");
const { Rcon } = require("rcon-client");

const app = express();
const PORT = process.env.PORT || 3000;

const RCON_HOST = process.env.RCON_HOST;
const RCON_PORT = process.env.RCON_PORT;
const RCON_PASSWORD = process.env.RCON_PASSWORD;
const API_KEY = process.env.API_KEY;

app.get("/", (req, res) => {
  res.send("Backend is running ✔");
});

app.get("/give-rank", async (req, res) => {
  const { user, rank, key } = req.query;

  if (key !== API_KEY) {
    return res.send("Invalid API key");
  }

  if (!user || !rank) {
    return res.send("Missing user or rank");
  }

  try {
    const rcon = await Rcon.connect({
      host: RCON_HOST,
      port: RCON_PORT,
      password: RCON_PASSWORD
    });

    await rcon.send(`/lp user ${user} parent set ${rank}`);
    await rcon.end();

    res.send(`Gave ${rank} to ${user}`);
  } catch (err) {
    console.error(err);
    res.send("RCON error");
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
