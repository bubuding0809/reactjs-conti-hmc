const multer = require("multer");

const multerInstance = multer({
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

module.exports = multerInstance;
