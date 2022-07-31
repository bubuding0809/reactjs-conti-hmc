var express = require("express");
var router = express.Router();

router.get("/:fileName", (req, res) => {
  const file = `${process.cwd()}/public/uploads/${req.params.fileName}`;
  res.download(file, req.params.file, error => {
    if (error) {
      res.status(404).json({ status: "error", message: "File not found" });
    }
  });
});

module.exports = router;
