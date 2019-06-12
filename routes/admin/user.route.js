var express = require("express");
var router = express.Router();
var userModel=require('../../models/users.model')

router.get('/',(req,res)=>{
    var p=userModel.all();
    console.log("ahihi");
    console.log(p);
    p.then(rows=>{
        console.log(rows);
        res.render('vUser/all',{
            layout:'_layouts/layout_admin',users:rows
        });
    })
});

router.get('/all',(req,res)=>{
    res.render('vUser/all',{
        layout:'_layouts/layout_admin'
    });
});

module.exports = router;