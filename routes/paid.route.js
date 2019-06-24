const express = require("express");
const numeral = require("numeral");
const gamesmodel = require("../models/games.model");
var router = express.Router();

router.get("/", async (req, res, next) => {
  var user = req.user;
  if (!user) res.redirect("/");
  var games = await gamesmodel.gameInCart(user.id);
  var num = games.length;
  var sum = 0;
  games.forEach(g => {
      sum+=g.price*(1+(g.saleoff/100));
  });
  sum=numeral(sum).format('0,0')
  res.render('thanh-toan',{
      title: "GINJSGame - Đăng ký tài khoản",
      customStyleSheet: "/stylesheets/signin.css",
      user: req.user,
      numGame: num,
      totalPrice: sum
  });    
});

router.post("/", async (req, res, next) => {
    var user = req.user;
  if (!user) res.redirect("/");
  var games = await gamesmodel.gameInCart(user.id);
  for (const g of games) {
    await Promise.all([ gamesmodel.addToLib(g.id,user.id),gamesmodel.deleteGameIncart({idgame:g.id,idaccount: user.id})])
  }

  res.redirect('/');
  
});

module.exports = router;
