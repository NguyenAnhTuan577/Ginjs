var express = require("express");
var router = express.Router();
var usermodel = require("../models/users.model");
var gamesmodel = require("../models/games.model");
var numeral = require("numeral");
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/cart", async (req, res) => {

  const data = {};
  data.user = req.user;
  if(!data.user) return res.redirect('/dang-nhap');

  var iduser = 1;
  try {
    var games = await gamesmodel.gameInCart(iduser);

    for (const g of games) {
      g.priceR = g.price * (1 - g.saleoff / 100);
      g.price = g.price;
    }
    var total = +0;
    var totalR = +0;
    for (const g of games) {
      total += g.price;
      totalR += g.priceR;
    }
    total = numeral(total).format("0,0");
    totalR = numeral(totalR).format("0,0");
    for (const g of games) {
      g.priceR = numeral(g.priceR).format("0,0");
      g.price = numeral(g.price).format("0,0");
    }
    var q;
    for (const g of games) {
      q += `idgame=${g.id}&`;
    }
    // q = q.substr(0, q.length - 1);
    q += `iduser=${iduser}`;
    res.render("cart", {
      title: "ginjsgame - giỏ hàng",
      categories: res.locals.lcCategories,
      games,
      total,
      totalR,
      query: q
    });
  } catch (error) {
    throw error;
  }
});

router.post("/cart", async (req, res) => {
  const data = {};
  data.user = req.user;
  if(!data.user) return res.redirect('/dang-nhap');

  var entity = req.body;
  try {
    await gamesmodel.deleteGameIncart(entity);
    res.redirect(req.originalUrl);
  } catch (error) {
    console.log(error);
    res.redirect(req.originalUrl);
  }
});

router.get("/xac-thuc", (req, res) => {
  res.end("xac thuc");
});

router.get('/lib',async (req,res)=>{

  const data = {};
  data.user = req.user;
  if(!data.user) return res.redirect('/dang-nhap');

  var iduser = 1;
  try {
    var [games,nums] = await Promise.all([ gamesmodel.gameinLib(iduser),gamesmodel.countInLib(iduser)]);
    var num = nums[0].num;

    res.render("lib", {
      title: "ginjsgame - Game của bạn",
      categories: res.locals.lcCategories,
      games,
      num
    });
  } catch (error) {
    throw error;
  }
})

module.exports = router;
