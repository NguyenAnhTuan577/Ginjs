var express = require("express");
var gamesmodel = require("../models/games.model");
var router = express.Router();

router.get("/", async (req, res) => {
  var g = await gamesmodel.singleWithDeltal(1);
  var game = g[0];
  //   var images = await gamesmodel.allImagesOfGame(game.id);
  //   var tags = await gamesmodel.allTagsOfGame(game.id);
  var images;
  var tags;
  await Promise.all([
    (images = await gamesmodel.allImagesOfGame(game.id)),
    (tags = await gamesmodel.allTagsOfGame(game.id))
  ]);

  // console.log(game);
  //   console.log(images);
//   for (const t of tags) {
//     console.log("\n\n" + t.name);
//   }
  console.log(tags);
  game.sale = (game.price * game.saleoff) / 100;
  console.log(game);

  res.render("xem-chi-tiet", {
    title: `${game.name} - GINJSGame - Xem chi tiết`,
    game,
    images,
    tags
  });
});

module.exports = router;
