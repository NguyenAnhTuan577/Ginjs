var categoriesmodel = require("../models/categories.model");

module.exports = async (req, res, next) => {
  res.locals.lcCategories = await categoriesmodel.all();
  next();
};
