var db = require("../dbs/db");

module.exports = {
  all: () => {
    return db.load("select * from tags");
  },
  allWithDeltal: () => {
    var sql = `select t.id,t.name, count(idgame) as num from tags t, games_tags gt where t.id=gt.idtag group by t.id,t.name`;
    return db.load(sql);
  }
};
