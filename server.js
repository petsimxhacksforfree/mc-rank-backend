const express = require("express");
const { Rcon } = require("rcon-client");

const app = express();

const PORT = process.env.PORT || 3000;

const RCON_HOST = process.env.RCON_HOST;
const RCON_PORT = process.env.RCON_PORT;
const RCON_PASSWORD = process.env.RCON_PASSWORD;

const API_KEY = process.env.API_KEY;

function auth(req, res, next) {
  if (req.query.key !== API_KEY) {
    return res.status(403).send("Invalid API key");
  }
  next();
}

app.get("/give-rank", auth, async (req, res) => {
  const user = req.query.user;
  const rank = req.query.rank;

  if (!user || !rank) return res.send("Missing data");

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
    res.status(500).send("RCON error");
  }
});

app.listen(PORT, () => {
  console.log("Server running");
});
