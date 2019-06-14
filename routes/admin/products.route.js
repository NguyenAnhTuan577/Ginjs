var express = require("express");
var router = express.Router();
var productModel=require("../../models/games.model")

router.get("/", (req, res) => {
  res.redirect('/admin/products/all')
});

router.get("/all", (req, res) => {
  var p=productModel.all();
    // console.log("ahihi");
    console.log(p);
    p.then(rows=>{
        console.log(rows);
        res.render('vProducts/all',{
            layout:'_layouts/layout_admin',products:rows
        });
    })
});

module.exports = router;
