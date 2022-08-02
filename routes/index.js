const express = require("express");
const path = require("path");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  //   res.render("index", { title: "Something" });
  res.sendFile(path.join(process.cwd(), "client", "build", "index.html"));
});

module.exports = router;
