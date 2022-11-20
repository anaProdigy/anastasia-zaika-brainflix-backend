const express = require("express");
const router = express.Router();
const path = require("node:path");
// json file path

const videosJSONFile = path.join(__dirname, "../data.json");
const data = require(videosJSONFile);

const { getNewId, writeJSONFile, timestamp } = require("../helper/helper");

//This package will generate a unique id for each new video
//const uuid = require("uuid");

// const videosFile = path.join(__dirname, "../data.json");
// const videos = require(videosFile);

// return all the videos
router.get("/", (_req, res) => {
  try {
    res.status(200).json(data);
  } catch (error) {
    console.log("Error retrieving the videos", error);
  }
});

// get a video by it's ID -> GET
router.get("/:videoId", (_req, res) => {
  const { videoId } = _req.params;

  const video = data.find((v) => {
    return v.id === videoId;
  });

  res.json(video);
});

//post new video
router.post("/", (req, res) => {
 
  const { title, channel, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      errorMessage: "Please provide title and description",
    });
  }
  const newVideo = {
    id: getNewId(),
    title,
    channel,
    description,
    image: "image0.jpeg",
    views: 0,
    likes: 0,
    timestamp: timestamp(),
    // video:
    comments: [],
  };

  data.push(newVideo);
  writeJSONFile(videosJSONFile, data);
  res.status(201).json(newVideo);
});

module.exports = router;
