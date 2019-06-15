var db = require("../dbs/db");
module.exports = {
  all: () => {
    return db.load("select * from Accounts");
  },
  add: entity => {
    return db.add("Accounts", entity);
  },
  login: (username, password) => {
    return db.load(
      `select * from accounts where username=${username} and password=${password}`
    );
  }
};
