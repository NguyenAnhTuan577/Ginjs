var express = require("express");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("vProducts/all",{
    layout:'_layouts/layout_admin'
});
});

router.get("/all", (req, res) => {
  res.render("vProducts/all",{
    layout:'_layouts/layout_admin'
});
});

module.exports = router;
