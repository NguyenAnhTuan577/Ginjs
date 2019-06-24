const express = require("express");
const gamesmodel = require("../models/games.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.user;
  if (!user) return res.redirect("/dang-nhap");

  var iduser = 1;
  try {
    var [games, nums] = await Promise.all([
      gamesmodel.gameinLib(user.id),
      gamesmodel.countInLib(user.id)
    ]);
    var num = nums[0].num;

    res.render("lib", {
      title: "ginjsgame - Game của bạn",
      categories: res.locals.lcCategories,
      games,
      num,
      user
    });
  } catch (error) {
    throw error;
  }
});

module.exports = router;
