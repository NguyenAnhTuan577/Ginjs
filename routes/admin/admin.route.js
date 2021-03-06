var express = require("express");
var router = express.Router();
router.get("/", (req, res) => {
  if(!req.user) return res.redirect('/dang-nhap');
  if(req.user.type==false) return res.redirect('/');
  res.redirect('/admin/charts/barchart')

});
router.use("/categories", require("./categories.route"));
router.use("/users", require("./user.route"));
router.use("/products", require("./products.route"));
router.use("/charts", require("./chart.route"));

module.exports = router;
