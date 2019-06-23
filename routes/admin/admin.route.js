var express = require("express");
var router = express.Router();
router.get("/", (req, res) => {
  if(!req.user) return res.redirect('/dang-nhap');
  if(!req.user.username!=='admin') return res.redirect('/');
  res.render('')

});
router.use("/categories", require("./categories.route"));
router.use("/users", require("./user.route"));
router.use("/products", require("./products.route"));
module.exports = router;
