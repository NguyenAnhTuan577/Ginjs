var createError = require("http-errors");
var express = require("express");
var exphbs = require("express-handlebars");
var hbssection = require("express-handlebars-sections");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index.route");
var usersRouter = require("./routes/user.route");

var userModel = require("./models/users.model");

//auth
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        const d1 = await userModel.singleWithUsername(username);
        var user = d1[0];
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        const isPasswordValid = await userModel.validPassword(
          username,
          password
        );
        // console.log("asdasdsadsadsadsadsadsadsadsadsadsadsadsadsad");
        // console.log(isPasswordValid);
        if (!isPasswordValid[0]) {
          // console.log("zo dccdcdcdcdcdcdcdcdcd ");
          return done(null, false, { message: "Incorrect password." });
        } else {
          return done(null, user);
        }
      } catch (e) {
        return done(e);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  const d = await userModel.singleWithUsername(username);
  const user = d[0];
  done(undefined, user);
});

var app = express();

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "layout.hbs",
    layoutsDir: "views/_layouts",
    helpers: {
      section: hbssection()
    }
  })
);
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//mdw-----------
app.use(require("./middlewares/index.mdw"));

//passport

app.use(
  session({ secret: "truongtuan", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

//index----------------------------------------------
app.use("/", indexRouter);

//user-----------------------------------------------
app.use("/user", usersRouter);

// them cho admin
app.use("/admin", require("./routes/admin/admin.route"));
// app.use("/admin/charts", require("./routes/admin/admin.route"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    title: "lỗi",
    categories: res.locals.lcCategories
  });
});

console.log("chạy thôi: http://localhost:3000");

module.exports = app;
