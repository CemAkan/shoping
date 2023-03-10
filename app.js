var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const checkAuth = require("./middleware/middleware");
var cors = require("cors");

//main route
var indexRouter = require("./routes/index");

//users routes
var usersRouter = require("./routes/user/users");
var likeRouter = require("./routes/user/like");
var cartRouter = require("./routes/user/cart");
var cardRouter = require("./routes/user/card");
var addressRouter = require("./routes/user/address");
var oldOrdersRouter = require("./routes/user/oldOrders");
var permissionsRouter = require("./routes/user/permissions");

//admin routes
var itemRouter = require("./routes/admin/items");
var categoryRouter = require("./routes/admin/category");
var listAllUsersRouter = require("./routes/admin/listAllUsers");
var announcementsRouter = require("./routes/admin/announcements");
var deliveryDetailsRouter = require("./routes/admin/deliveryDetails");
var itemVariantsRouter = require("./routes/admin/itemVariants");
var similarItemsRouter = require("./routes/admin/similarItems");
var photoRouter = require("./routes/admin/photo");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
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
app.use("/card", cardRouter);
app.use("/address", addressRouter);
app.use("/oldOrders", oldOrdersRouter);
app.use("/permissions", permissionsRouter);

//admin routes
app.use("/admin/category", checkAuth, categoryRouter);
app.use("/admin/items", checkAuth, itemRouter);
app.use("/admin/users-list", checkAuth, listAllUsersRouter);
app.use("/admin/announcement", checkAuth, announcementsRouter);
app.use("/admin/deliveryDetails", checkAuth, deliveryDetailsRouter);
app.use("/admin/itemVariants", checkAuth, itemVariantsRouter);
app.use("/admin/similarItems", checkAuth, similarItemsRouter);
app.use("/admin/photo", checkAuth, photoRouter);

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
