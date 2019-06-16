var express = require("express");
var router = express.Router();
router.get("/", (req, res) => {
  res.redirect("/dang-nhap");
});
router.use("/categories", require("./categories.route"));
router.use("/users", require("./user.route"));
router.use("/products", require("./products.route"));
module.exports = router;
