var express = require("express");
var router = express.Router();

router.get('/barchart',(req,res)=>{
    if(!req.user||req.user.username!=='admin') return res.redirect('/');
    
    res.render('chart/barchart',{
        layout:'layout_admin.hbs'
    });
    
});

router.get('/linechart',(req,res)=>{
    if(!req.user||req.user.username!=='admin') return res.redirect('/');
    
    res.render('chart/linechart',{
        layout:'layout_admin.hbs'
    }); 
});

module.exports = router;
