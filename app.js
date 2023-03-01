var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const checkAuth = require("./middleware/middleware");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user/users");
var itemRouter = require("./routes/admin/items");
var likeRouter = require("./routes/user/like");
var cartRouter = require("./routes/user/cart");
var categoryRouter = require("./routes/admin/category");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// common route
app.use("/", indexRouter);

// user routes
app.use("/users", usersRouter);
app.use("/like", likeRouter);
app.use("/cart", cartRouter);

//admin routes
app.use("/admin/category", checkAuth, categoryRouter);
app.use("/admin/items", checkAuth, itemRouter);

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
