var express = require("express");
var md5 = require("md5");
var router = express.Router();
var authcontroller = require("../controllers/auth.controller");
var usermodel = require("../models/users.model");
var gamesmodel = require("../models/games.model");
var passport = require("passport");
//index------------------------------------------

router.get("/", require("../controllers/index.controller"));

//xem chi tiet-------------------------------------
router.use("/xem-chi-tiet", require("../controllers/detal.controller"));

//Xem theo danh muc---------------------------------
router.get(
  "/danh-sach-san-pham-theo-loai",
  require("../controllers/categories.controller")
);
//tiem kiem ---------------------------------------
router.get("/tim-kiem", async (req, res, next) => {
  console.log(req.query);
  var games = await gamesmodel.allWithQuery(
    req.query.categories,
    req.query.tags,
    parseInt(req.query.min),
    parseInt(req.query.max)
  );
  console.log(games);
  res.render("search", {
    title: "GINJSGame-Tìm kiếm",
    games,
    categories: res.locals.categories
  });
});

//dang ky---------------------------------------
router.get("/dang-ky", function(req, res, next) {
  res.render("signup", { title: "GINJSGame - Đăng ký tài khoản" });
});

router.post("/dang-ky", authcontroller.registerPost);


//dang nhap --------------------------------------
router.get("/dang-nhap/", (req, res, next)=> {
  res.render("signin", {
    title: "GINJSGame - Đăng ký tài khoản",
    customStyleSheet: "/stylesheets/signin.css",
    message: req.message
  });
});
router.post(
  "/dang-nhap",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/dang-nhap"
  })
);

router.get("/cap-nhat-tai-khoan", (req, res, next) => {
  res.render("updateinfo", { title: "GINJSGame - Cập nhật tài khoản" });
});

router.get("/quen-mat-khau", (req, res, next) => {
  res.render("forgotpassword", { title: "GINJSGame - Lấy lại mật khẩu" });
});

router.get('/dang-xuat',authcontroller.logout);
module.exports = router;
