var express = require("express");
var router = express.Router();
var productModel=require("../../models/games.model")

router.get("/", (req, res) => {
    if(!req.user||req.user.username!=='admin') return res.redirect('/');

    res.redirect('/admin/products/all')
});

router.get("/all", (req, res) => {
    if(!req.user||req.user.username!=='admin') return res.redirect('/');

    var p=productModel.all();
    // console.log("ahihi");
    // console.log(p);
    p.then(rows=>{
        console.log(rows);
        res.render('vProducts/all',{
            layout:'layout_admin.hbs',products:rows
        });
    })
});

router.get("/:id", (req, res) => {
    if(!req.user||req.user.username!=='admin') return res.redirect('/');

    var id=req.params.id
    var p=productModel.allGameOfACategory(id);
      // console.log("ahihi");
      // console.log(p);
      p.then(rows=>{
          console.log(rows);
          res.render('vProducts/all',{
              layout:'layout_admin.hbs',products:rows
          });
      })
  });

router.post("/all/add",async (req,res,next)=>{
    if(!req.user||req.user.username!=='admin') return res.redirect('/');

    // console.log("hello them nekB");
  try {
      // console.log(req.body);
      await productModel.add(req.body)
      // console.log(req.body);
  } catch{

      err => { next(err) }
  } finally {
      res.redirect('/admin/products/all');

  }
})

router.post("/all/update",async (req,res,next)=>{
    if(!req.user||req.user.username!=='admin') return res.redirect('/');

    // console.log("asdfghjhgfdsdfghjhgfdsdfghjhgfdsdrftyuytrertyu");
  try {
      await productModel.update(req.body);
  } catch{
      err => { next(err) }
  } finally {
      res.redirect('/admin/products/all');

  }
})

router.post("/all/delete",async (req,res,next)=>{
    if(!req.user||req.user.username!=='admin') return res.redirect('/');

    // console.log("asdfghjhgfdsdfghjhgfdsdfghjhgfdsdrftyuytrertyu");
  try {
      await productModel.delete("id",req.body.id)
  } catch{
      err => { next(err) }
  } finally {
      res.redirect('/admin/products/all');

  }
})

module.exports = router;
