var db = require("../dbs/db");

module.exports = {
  all: () => {
    var sql = "select * from games";
    return db.load(sql);
  },
  allGameOfACategory: idCategory => {
    var sql = `select * from games g where g.idcategory = ${idCategory}`;
    return db.load(sql);
  },
  allWithDeltal: (limit, fieldOrder) => {
    var sql = `select g.id, g.name, c.name category, g.idcategory, amount, price, saleoff, t.image
      from games g,categories c, (select idgame,max(linkimage) as image from game_image group by idgame) as t
      where g.idcategory=c.id and g.id=t.idgame
      order by ${fieldOrder} desc limit ${limit} `;
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
  },
  pageByCat: (idcat, offset, limit) => {
    var sql = `select g.id, g.name, c.name category, g.idcategory, amount, price, saleoff, t.image
      from games g,categories c, (select idgame,max(linkimage) as image from game_image group by idgame) as t
      where g.idcategory=c.id and g.id=t.idgame and g.idcategory=${idcat}
      limit ${limit} offset ${offset}`;
    return db.load(sql);
  },

  numOfPgae: idcat => {
    var sql = `select count(*) as num from games where idcategory=${idcat}`;
    return db.load(sql);
  },
  allWithQuery: (categories, tags, min, max) => {
    var sql = `select distinct g.id, g.name, c.name category, g.idcategory, amount, price, saleoff, i.image
    from games g,categories c,games_tags gt,tags t, (select idgame,max(linkimage) as image from game_image group by idgame) as i
    where g.idcategory=c.id and g.id = i.idgame and t.id=gt.idtag and gt.idgame=g.id `;
    //   var values = Object.keys(object).map((key) => {
    //     return object[key];
    // });
    // console.log(categories);
    if (categories && categories.length) {
      sql += `and (`;
      categories.forEach(c => {
        sql += ` c.id = ${c} or`;
      });
      sql = sql.substr(0, sql.length - 3);
      sql += `)`;
    }
    // console.log(tags);
    if (tags && tags.length) {
      sql += `and (`;
      tags.forEach(t => {
        sql += ` t.id = ${t} or`;
      });
      sql = sql.substr(0, sql.length - 3);
      sql += `)`;
    }
    sql += `and price between ${min} and ${max}`;
    console.log(sql);
    return db.load(sql);
  },
  gameInCart: idUser=>{
    var sql=`select distinct g.*,image 
    from games g, Accounts a, gameincart gc , (select idgame,max(linkimage) as image from game_image group by idgame) as i
    where g.id=gc.idgame and gc.idaccount = ${idUser} and g.id=i.idgame`
    return db.load(sql);
  },
  gameinLib: idUser=>{
    var sql=`select distinct g.*,image 
    from games g, Accounts a, PaidGame pg , (select idgame,max(linkimage) as image from game_image group by idgame) as i
    where g.id=pg.idgame and pg.idaccount = ${idUser} and g.id=i.idgame`
    return db.load(sql);
  },
  countInLib: idUser=>{
    var sql=`select count(*) num
    from PaidGame pg
    where idaccount=${idUser}`
    return db.load(sql);
  },

  deleteGameIncart: (entity)=>{
    return db.delete("gameincart",entity)
  } 
};
