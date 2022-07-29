var express = require("express");
var router = express.Router();
const multer = require("multer");

// require google services
const {
  authenticateGoogle,
  uploadToGoogleDrive,
  deleteFile,
} = require("../services/googleServices");

// setup multer instance configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, `${__dirname}/temp`);
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + "_" + file.originalname);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// define routes
router.post("/", upload.array("files"), async (req, res) => {
  try {
    const auth = authenticateGoogle();
    req.files.forEach(async file => {
      const response = await uploadToGoogleDrive(file, auth);
      console.log(response);
      deleteFile(file);
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
});

module.exports = router;
