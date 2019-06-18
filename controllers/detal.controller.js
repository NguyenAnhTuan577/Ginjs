var gamesmodel = require("../models/games.model");
var numeral = require("numeral");

module.exports = async (req, res) => {
  var id = req.query.id || 1;
  if (id < 1) id = 1;

  var g = await gamesmodel.singleWithDeltal(id);
  var game = g[0];
  //   var images = await gamesmodel.allImagesOfGame(game.id);
  //   var tags = await gamesmodel.allTagsOfGame(game.id);
  var images;
  var tags;
  await Promise.all([
    gamesmodel.allImagesOfGame(game.id).then(data => {
      images = data;
    }),
    gamesmodel.allTagsOfGame(game.id).then(data => {
      tags = data;
    })
  ]);

  // console.log(game);
  //   console.log(images);
  //   for (const t of tags) {
  //     console.log("\n\n" + t.name);
  //   }
  console.log(tags);
  game.sale = numeral((game.price * game.saleoff) / 100).format("0,0");
  game.price = numeral(game.price).format("0,0");
  console.log(game);

  res.render("xem-chi-tiet", {
    title: `${game.name} - GINJSGame - Xem chi tiết`,
    categories: res.locals.lcCategories,
    game,
    images,
    tags
  });
};
