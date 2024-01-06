var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const entitiesRouter = require("./src/routes/entities.router");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/entities", entitiesRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

/* SAVE FOR LATER THIS QUERY DINAMICALLY
const queryEntity = async (req, res) => {
  try {
    const dynamicModel = db.model(req.body.name);

    const result = await dynamicModel.findAll();
    
    res.status(200).send({
      msg: "Query successful",
      result: result,
    });
  } catch (err) {
    res.status(500).send({
      msg: "Something went wrong while querying the entity",
      err: err,
    });
  }
};
*/
