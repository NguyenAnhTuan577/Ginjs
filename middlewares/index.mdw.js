var categoriesmodel = require("../models/categories.model");
var productsModel = require("../models/games.model");
var usersModel = require("../models/users.model");

module.exports = async (req, res, next) => {
  res.locals.lcCategories = await categoriesmodel.all();
  next();
};

