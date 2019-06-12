var express = require("express");
var router = express.Router();
var categoryModel=require('../../models/categories.model')

router.get('/',(req,res)=>{
    res.redirect('/admin/categories/all')
});

router.get('/all',(req,res)=>{
    var p=categoryModel.all();
    // console.log("ahihi");
    console.log(p);
    p.then(rows=>{
        console.log(rows);
        res.render('vCategories/all',{
            layout:'_layouts/layout_admin',categories:rows
        });
    })
});

module.exports = router;