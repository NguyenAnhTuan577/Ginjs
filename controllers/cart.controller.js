var gamesModel = require("../models/games.model");
var numeral = require("numeral");
exports.home = async (req, res, next) => {
  const user = req.user;
  if (!user) return res.redirect("/dang-nhap");

  try {
    var games = await gamesModel.gameInCart(user.id);

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
    var numC, numL;
    if (req.user) {
      var [numInLib, numInCart] = await Promise.all([
        gamesModel.numGameInLib(req.user.id),
        gamesModel.numGameInCart(req.user.id)
      ]);
      numC = numInCart[0].num;
      numL = numInLib[0].num;
    }
    res.render("cart", {
      title: "ginjsgame - giỏ hàng",
      categories: res.locals.lcCategories,
      games,
      total,
      totalR,
      numC,
      numL,
      user
    });
  } catch (error) {
    throw error;
  }
};

// ajax la tra ve data
// chu ko hien thi len
exports.addToCart = async (req, res, next) => {
  const data = {};
  const idgame = req.body.idgame;
  // let command = req.body.command;
  // if(!command) command ='add_or_remove'; // add_or_remove, minus, plus
  data.isSignIn = !!req.user;
  data.result = "do_nothing"; // mean do nothing
  if (data.isSignIn) {
    let iduser = req.user.id;

    let cart = await gamesModel.gameInCart(iduser);
    let numInCart = cart.length;
    let existed = false;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == idgame) {
        const entity = { idgame, idaccount: iduser };
        await gamesModel.deleteGameIncart(entity);
        data.result = "removed";
        existed = true;
        numInCart--;
        break;
      }
    }

    if (!existed) {
      await gamesModel.addToCart(idgame, iduser);
      data.result = "added";
      numInCart++;
    }
    data.numInCart = numInCart;
  }

  res.send(data);
};
exports.remove = async (req, res, next) => {
  const data = {};
  const idgame = req.body.idgame;
  data.isSignIn = !!req.user;
  data.result = "no_thing";
  if (data.isSignIn) {
    let user = req.user;
    var cart = await gamesModel.gameInCart(user.id);
    let numInCart = cart.length;

    var total = +0;
    var totalR = +0;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == idgame) {
        const entity = { idgame, idaccount: user.id };
        await gamesModel.deleteGameIncart(entity);
        data.result = "removed";

        numInCart--;
      } else {
        total += cart[i].price;
        totalR += cart[i].price * (1 + cart[i] / 100);
      }
    }
    data.total = numeral(total).format("0,0");
    data.totalR = numeral(totalR).format("0,0");
    data.numInCart = numInCart;

    // data.result = 'success';
  }
  res.send(data);
};
