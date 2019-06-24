var db = require("../dbs/db");
module.exports = { 
  add: object => {
    return db.add("game_image", object);
  }
};
