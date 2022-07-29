var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("files"), (req, res) => {
  console.log(req.files);
  console.log(req.body);
  res.status(200).json({ status: "success" });
});

module.exports = router;
