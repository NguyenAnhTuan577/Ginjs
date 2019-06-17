var express = require("express");
var md5 = require("md5");
var router = express.Router();
var usermodel = require("../models/users.model");
var app_name = "GINJSGame - Shop game số 1 VN";
var gamesmodel = require("../models/games.model");
var tagsmodel = require("../models/tags.model");
var numeral = require("numeral");
//index------------------------------------------
router.use(require("../middlewares/index.mdw"));
router.get("/", async (req, res) => {
  var [gamesRun, gamesSale] = await Promise.all([
    gamesmodel.allWithDeltal(6, "amount"),
    gamesmodel.allWithDeltal(6, "saleoff")
  ]);
  for (const i of gamesRun) {
    i.priceReal = numeral(Math.round(+i.price * (1 - +i.saleoff / 100))).format(
      "0,0"
    );
    i.price = numeral(i.price).format("0,0");
  }
  for (const i of gamesSale) {
    i.priceReal = numeral(Math.round(+i.price * (1 - +i.saleoff / 100))).format(
      "0,0"
    );
    i.price = numeral(i.price).format("0,0");
  }
  console.log("----------------------------");
  // console.log(gamesSale);

  res.render("index", {
    title: app_name,
    categories: res.locals.lcCategories,
    gamesRun,
    gamesSale
  });
});

//xem chi tiet
router.use("/xem-chi-tiet", require("./detal.route"));

//Xem theo danh muc---------------------------------
router.get("/danh-sach-san-pham-theo-loai", async (req, res, next) => {
  var id = req.query.id || 1;
  var page = req.query.page || 1;

  if (id < 1) id = 1;
  if (page < 1) page = 1;

  var limit = 3;
  var offset = (page - 1) * limit;

  var cats = res.locals.lcCategories;
  try {
    var [games, num, tags] = await Promise.all([
      gamesmodel.pageByCat(id, offset, limit),
      gamesmodel.numOfPgae(id),
      tagsmodel.allWithDeltal()
    ]);
    for (const i of games) {
      i.priceReal = numeral(Math.round(+i.price * (1 - +i.saleoff / 100))).format(
        "0,0"
      );
      i.price = numeral(i.price).format("0,0");
    }
    var count = num[0].num;
      // console.log("load rout       "+count)
      var numpage = Math.floor(count / limit);
      if (count % limit > 0) numpage++;
      var pages = [];

      for (var index = 0; index < numpage; index++) {
        let obj = { value: index + 1, active: false };
        if (obj.value == page) {
          obj.active = true;
        }
        pages.push(obj);
      }

    res.render("danh-sach-san-pham-theo-loai", {
      title: "GINJSGame - Danh sách sản phẩm",
      games,
      tags,
      categories: cats,
      pages
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
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
    res.redirect("/dang-ky");
  }
  res.redirect("/");

  //
});

//dang nhap --------------------------------------
router.get("/dang-nhap/", function(req, res, next) {
  res.render("signin", {
    title: "GINJSGame - Đăng ký tài khoản",
    customStyleSheet: "/stylesheets/signin.css"
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
    res.redirect("/dang-ky");
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
