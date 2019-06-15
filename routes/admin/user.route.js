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

router.get('/clients',(req,res)=>{
    var p=userModel.clients();
    // console.log("ahihi");
    console.log(p);
    p.then(rows=>{
        console.log(rows);
        res.render('vUser/all',{
            layout:'_layouts/layout_admin',users:rows
        });
    })
});

router.get('/admins',(req,res)=>{
    var p=userModel.admins();
    // console.log("ahihi");
    console.log(p);
    p.then(rows=>{
        console.log(rows);
        res.render('vUser/all',{
            layout:'_layouts/layout_admin',users:rows
        });
    })
});

router.post("/all/add",async (req,res,next)=>{
    // console.log("hello them nekB");
    try {
        // console.log(req.body);
        await userModel.add(req.body)
        // console.log(req.body);
    } catch{

        err => { next(err) }
    } finally {
        res.redirect('/admin/users/all');

    }
})

router.post("/all/update",async (req,res,next)=>{
    // console.log("asdfghjhgfdsdfghjhgfdsdfghjhgfdsdrftyuytrertyu");
    try {
        await userModel.update(req.body);
    } catch{
        err => { next(err) }
    } finally {
        res.redirect('/admin/users/all');

    }
})

router.post("/all/delete",async (req,res,next)=>{
    // console.log("asdfghjhgfdsdfghjhgfdsdfghjhgfdsdrftyuytrertyu");
    try {
        await userModel.delete(req.body.id)
    } catch{
        err => { next(err) }
    } finally {
        res.redirect('/admin/users/all');

    }
})

module.exports = router;