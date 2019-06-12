var db = require("../dbs/db");

module.exports = {
  all: () => {
    var sql = "select * from games";
    return db.load(sql);
  },
  allWithDeltal: () => {
    var sql =
      "select g.id,g.name,c.name category, amount,content, price,saleoff,configuration from games g,categoeies c where g.idcategory=c.id";
    return db.load(sql);
  },

  singleWithDeltal: id => {
    var sql = `select g.id,g.name,g.idcategory ,c.name category, amount,content, price,saleoff,configuration from games g,categories c where g.id = ${id} and g.idcategory=c.id`;
    return db.load(sql);
  },
  add: entity => {
    return db.add("games", entity);
  },
  update: entity => {
    return db.update("games", entity);
  },
  delete: (nameField, id) => {
    return db.delete("games", nameField, id);
  },
  allImagesOfGame: id => {
    var sql = `select * from game_image where idgame=${id}`;
    return db.load(sql);
  },
  allTagsOfGame: id => {
    var sql = `select t.* from Games_Tags gt,Tags t where gt.idgame=${id} and gt.idTag=t.id`;
    return db.load(sql);
  }
};
