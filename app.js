var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var testAPIRouter = require("./routes/testAPI");
const multerInstance = require("./middleware/multerInstance");
const {
  authenticateGoogle,
  uploadToGoogleDrive,
  deleteFile,
} = require("./services/googleServices");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPIRouter);
app.post("/file_upload", upload.array("files"), (req, res) => {
  console.log(req.files);
  console.log(req.body);
  res.json({ status: "success" });
});
app.post(
  "/file_upload_google",
  multerInstance.array("files"),
  async (req, res) => {
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
  }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
