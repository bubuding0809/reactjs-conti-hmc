var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client", "build")));

// Require Routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var fileUploadRouter = require("./routes/file_upload");
var fileUploadGoogleRouter = require("./routes/file_upload_google");
var videoStreamerRouter = require("./routes/video_streamer");
var fileDownloadRouter = require("./routes/file_download");
var twilioMessageRouter = require("./routes/twilio_message");
var twilioVoiceRouter = require("./routes/twilio_voice");

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/file_upload_google", fileUploadGoogleRouter);
app.use("/file_upload", fileUploadRouter);
app.use("/video_streamer", videoStreamerRouter);
app.use("/file_download", fileDownloadRouter);
app.use("/twilio_message", twilioMessageRouter);
app.use("/twilio_voice", twilioVoiceRouter);

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
