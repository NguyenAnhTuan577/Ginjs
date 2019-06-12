var express = require("express");
var router = express.Router();
var userModel=require('../../models/users.model')

router.get('/',(req,res)=>{
    res.redirect('/admin/users/all')
});

router.get('/all',(req,res)=>{
    var p=userModel.all();
    // console.log("ahihi");
    console.log(p);
    p.then(rows=>{
        console.log(rows);
        res.render('vUser/all',{
            layout:'_layouts/layout_admin',users:rows
        });
    })
});

module.exports = router;