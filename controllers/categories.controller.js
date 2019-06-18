var gamesmodel = require('../models/games.model')
var tagsmodel = require('../models/tags.model')
var numeral = require("numeral");
module.exports= async (req, res, next) => {
    // console.log(req.query);
    var id = req.query.id || 1;
    var page = req.query.page || 1;
  
    if (id < 1) id = 1;
    if (page < 1) page = 1;
  
    var limit = 3;
    var offset = (page - 1) * limit;
  
    var cats = res.locals.lcCategories;
    try {
      var [games, num, tags] = await Promise.all([
        gamesmodel.pageByCat(id, offset, limit),
        gamesmodel.numOfPgae(id),
        tagsmodel.allWithDeltal()
      ]);
      for (const i of games) {
        i.priceReal = numeral(Math.round(+i.price * (1 - +i.saleoff / 100))).format(
          "0,0"
        );
        i.price = numeral(i.price).format("0,0");
      }
      var count = num[0].num;
        // console.log("load rout       "+count)
        var numpage = Math.floor(count / limit);
        if (count % limit > 0) numpage++;
        var pages = [];
  
        for (var index = 0; index < numpage; index++) {
          let obj = { value: index + 1, active: false };
          if (obj.value == page) {
            obj.active = true;
          }
          pages.push(obj);
        }
  
      res.render("danh-sach-san-pham-theo-loai", {
        title: "GINJSGame - Danh sách sản phẩm",
        games,
        tags,
        categories: cats,
        pages
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }