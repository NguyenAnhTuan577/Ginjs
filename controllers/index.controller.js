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
  var numC,numL;
if(req.user){
  var [numInLib,numInCart]=await Promise.all([gamesmodel.numGameInLib(req.user.id),gamesmodel.numGameInCart(req.user.id)]);
  numC=numInCart[0].num;
  numL=numInLib[0].num;
}
  

  console.log("----------------------------");
  // console.log(gamesSale);
  console.log(req.user);
  res.render("index", {
    title: "GINJSGame - Shop game số 1 VN",
    categories: res.locals.lcCategories,
    gamesRun,
    gamesSale,
    user: req.user,
    numC,
    numL
  });
};
