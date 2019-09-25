require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("./client"));

app.get("/playlist", async (req, res) => {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${process.env.PLAYLIST_ID}&key=${process.env.API_KEY}`;
  try {
    const respones = await fetch(url);
    const data = await respones.json();
    res.status(200).json(data);
  } catch (err) {
    res.json([]);
    console.log(err);
  }
  // fetch(url)
  //   .then(respones => respones.json())
  //   .then(data => {
  //     return res.status(200).json(data);
  //   })
  //   .catch(err => res.send("ALERT! ALERT!"));
});

app.get("/playlist/:pageToken", async (req, res) => {
  const urlWithPageToken = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&pageToken=${req.params.pageToken}&playlistId=${process.env.PLAYLIST_ID}&key=${process.env.API_KEY}`;
  try {
    const respones = await fetch(urlWithPageToken);
    const data = await respones.json();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
