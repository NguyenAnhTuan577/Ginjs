var gamesmodel = require("../models/games.model");
var numeral = require("numeral");
module.exports = async (req, res) => {
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
    title: "GINJSGame - Shop game số 1 VN",
    categories: res.locals.lcCategories,
    gamesRun,
    gamesSale
  });
};
