var express = require("express");
var md5 = require("md5");
var router = express.Router();
var usermodel = require("../models/users.model");
var app_name = "GINJSGame - Shop game số 1 VN";
//index------------------------------------------
router.use(require("../middlewares/index.mdw"));
router.get("/", (req, res) => {
  res.render("index", { title: app_name, categories: res.locals.lcCategories });
});

//xem chi tiet
router.use("/xem-chi-tiet", require("./detal.route"));

//----------------------------------------------
router.get("/danh-sach-san-pham-theo-loai", function(req, res, next) {
  res.render("danh-sach-san-pham-theo-loai", {
    title: "GINJSGame - Danh sách sản phẩm"
  });
});
router.get("/tim-kiem/", function(req, res, next) {
  res.render("search", { title: "GINJSGame-Tìm kiếm" });
});

//dang ky---------------------------------------
router.get("/dang-ky", function(req, res, next) {
  res.render("signup", { title: "GINJSGame - Đăng ký tài khoản" });
});

router.post("/dang-ky", async (req, res, next) => {
  // res.render("signup", { title: "GINJSGame - Đăng ký tài khoản" });
  var entity = req.body;
  //entity.password = md5(entity.password);
  console.log(entity);
  try {
    await usermodel.add(entity);
  } catch (error) {
    console.log(error);
    res.redirect("/dang-ky")
  }
  res.redirect("/");

  

  //
});

//dang nhap --------------------------------------
router.get("/dang-nhap/", function(req, res, next) {
  res.render("signin", {
    title: "GINJSGame - Đăng ký tài khoản",
    customStyleSheet: "stylesheets/signin.css"
  });
});

router.post("/dang-nhap", async (req, res, next) => {

  var entity = req.body;
  //entity.password = md5(entity.password);
  console.log(entity);
  try {
    await usermodel.login(entity.username, entity.password);
  } catch (error) {
    console.log(error);
    res.redirect("/dang-ky")
  }
  res.redirect("/");

  // res.render("signin", {
  //   title: "GINJSGame - Đăng ký tài khoản",
  //   customStyleSheet: "stylesheets/signin.css"
  // });
});
//---------------------------------------------------
router.get("/cap-nhat-tai-khoan/", function(req, res, next) {
  res.render("updateinfo", { title: "GINJSGame - Cập nhật tài khoản" });
});
router.get("/cntk/", function(req, res, next) {
  res.render("updateinfo", { title: "GINJSGame - Cập nhật tài khoản" });
});

router.get("/quen-mat-khau/", function(req, res, next) {
  res.render("forgotpassword", { title: "GINJSGame - Lấy lại mật khẩu" });
});

module.exports = router;
