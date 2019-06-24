var express = require("express");
var router = express.Router();
var usermodel = require("../models/users.model");
var gamesmodel = require("../models/games.model");
var numeral = require("numeral");
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/xac-thuc", (req, res) => {
  res.end("xac thuc");
});

router.get('/lib',async (req,res)=>{

  const user = req.user;
  if(!user) return res.redirect('/dang-nhap');

  var iduser = 1;
  try {
    var [games,nums] = await Promise.all([ gamesmodel.gameinLib(user.id),gamesmodel.countInLib(user.id)]);
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
