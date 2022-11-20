const express = require("express");
const router = express.Router();
const path = require("node:path");

const videosJSONFile = path.join(__dirname, "../data.json");
const data = require(videosJSONFile);

const { getNewId, writeJSONFile, timestamp } = require("../helper/helper");


router
.post("/:id/comments", (req, res) => {
  const videoId = req.params.id;
  const selectedVideo = data.find((video) => video.id === videoId);
  newComment = {
    name: req.body.name,
    comment: req.body.comment,
    id: req.body.id,
    likes: 0,
    timestamp: timestamp(),
  };
  selectedVideo.comments.push(newComment);
  //find the video in the array and reassign old data to new data with new comment
  data.map((data) => {
    if (data.id === selectedVideo.id) {
      return (data = selectedVideo);
    }
  });
   writeJSONFile(videosJSONFile, data);
   res.status(201).json(newVComment);
});

router
.delete("/:videoId/comments/:commentId", (req, res) => {
        const videoId = req.params.videoId
        const commentId = req.params.commentId
        const selectedVideo = data.find(video => video.id === videoId)
        const selectedComment = selectedVideo.comments.find(comment => comment.id === commentId)
        const commentIndex = selectedVideo.comments.indexOf(selectedComment)
        selectedVideo.comments.splice(commentIndex,1)
        //find the video in the array and reassign old data to new data without deleted comment
        data.map(data => {
            if (data.id === selectedVideo.id){
                return data = selectedVideo
            }
        })
       writeJSONFile(videosJSONFile, data);
  res.status(201).json(selectedComment);
    })
module.exports = router;