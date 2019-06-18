var db = require("../dbs/db");
module.exports = {
  all: () => {
    return db.load(`select c.id,c.name,count(g.id) num 
        from categories c left join games g  on c.id=g.idcategory 
        group by c.id,c.name`);
  },
  add: object => {
    return db.add("categories", object);
  },
  update: object => {
    return db.update("categories", object);
  },
  delete: id => {
    return db.delete("categories", "id", id);
  }
};
