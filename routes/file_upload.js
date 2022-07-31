var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `${process.cwd()}/public/uploads`);
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + "_" + file.originalname);
    },
  }),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

router.post("/", upload.array("files"), (req, res) => {
  console.log(req.files);
  console.log(req.body);
  res.status(200).json({ status: "success" });
});

module.exports = router;
