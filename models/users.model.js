var db = require("../dbs/db");
var md5 = require("md5");

module.exports = {
  all: () => {
    return db.load("select * from Accounts");
  },
  clients: () => {
    return db.load("select * from Accounts where type=false");
  },
  admins: () => {
    return db.load("select * from Accounts where type=true");
  },
  add: object => {
    return db.add("accounts", object);
  },
  update: object => {
    return db.update("accounts", object);
  },
  delete: id => {
    return db.delete("accounts", "id", id);
  },
  getUserByUsername: username => {
    // console.log("ông chắc cái hàm này chạy dc chưa cái này chạy đúng rồi, ko cần async await luôn á ");
    return db.load(`select * from accounts where username='${username}' `);
  },
  login: (username, password) => {
    return db.load(
      `select * from accounts where username='${username}' and password='${password}'`
    );
  },
  singleWithID: id => {
    return db.load(`select * from Accounts where id=${id}`);//cai này là số
  },
  singleWithUsername: username => {  //username na2y khong6 ton621 tai5
    return db.load(`select * from Accounts where username='${username}'`);
  },
  validPassword: (username, password) => {
    var pass = md5(password);
    return db.load(
      `select * from Accounts where username='${username}' and password = '${pass}'`
    );
  }
};

//do t zo database