var db = require("../dbs/db");
module.exports = {
  all: () => {
    return db.load(`select c.id,c.name,count(g.id) num 
        from categories c left join games g  on c.id=g.idcategory 
        group by c.id,c.name`);
  },
  nameCategory: () => {
    return db.load(`select * from categories`);
  },
  idCategory: (name) => {
    console.log(name);
    var sql=`select c.id from categories c where c.name='${name}'`
    console.log(sql);
    return db.load(sql);
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
