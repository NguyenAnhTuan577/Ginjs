var gamesroute = require("../models/games.route");

module.exports = {
  index: (req, res) => {
    res.render("index", { title: app_name });
  },
  gamedetal: (req, res) => {
    res.render("xem-chi-tiet", { title: "GINJSGame-Xem chi tiết" });
  }
};
