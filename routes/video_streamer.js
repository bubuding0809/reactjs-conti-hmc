const express = require("express");
const router = express.Router();
const fs = require("fs");
const CHUNK_SIZE = 1024 * 1024; // 1MB

router.get("/", (req, res) => {
  const range = req.headers.range;
  const video = req.query.video;

  // check if video param is valid
  if (!video) {
    res.status(400).json({ status: "error", message: "No video provided" });
    return;
  }

  // check if range header is valid
  if (!range) {
    res.status(400).send("Requires range header");
    return;
  }

  const videoPath = `${process.cwd()}/uploads/${video}`;

  // check if video file exists
  var videoSize;
  try {
    videoSize = fs.statSync(videoPath).size;
  } catch (error) {
    res
      .status(404)
      .json({ status: "error not found", message: "Video not found" });
    return;
  }

  // Calculate start and end bytes
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;

  // Create response header
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // Send response
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

module.exports = router;
