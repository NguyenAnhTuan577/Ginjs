var express = require("express");
var router = express.Router();
var productModel = require("../../models/games.model")
var categoryModel = require("../../models/categories.model")
var imageModel = require("../../models/game_image.model")

router.get("/", (req, res) => {
    if (!req.user || req.user.username !== 'admin') return res.redirect('/');

    res.redirect('/admin/products/all')
});

router.get("/addProduct", (req, res) => {
    if (!req.user || req.user.username !== 'admin') return res.redirect('/');
    var p = categoryModel.nameCategory();
    p.then(rows => {
        console.log(rows);
        res.render('vProducts/addProduct', {
            layout: 'layout_admin.hbs', categories: rows
        });
    })
});

router.get("/all", (req, res) => {
    if (!req.user || req.user.username !== 'admin') return res.redirect('/');

    var p = productModel.all();
    // console.log("ahihi");
    // console.log(p);
    p.then(rows => {
        console.log(rows);
        res.render('vProducts/all', {
            layout: 'layout_admin.hbs', products: rows
        });
    })
});

router.get("/:id", (req, res) => {
    if (!req.user || req.user.username !== 'admin') return res.redirect('/');

    var id = req.params.id
    var p = productModel.allGameOfACategory(id);
    // console.log("ahihi");
    // console.log(p);
    p.then(rows => {
        console.log(rows);
        res.render('vProducts/all', {
            layout: 'layout_admin.hbs', products: rows
        });
    })
});

router.post("/all/add", async (req, res, next) => {
    if (!req.user || req.user.username !== 'admin') return res.redirect('/');

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

router.post("/addProduct", async (req, res, next) => {
    if (!req.user || req.user.username !== 'admin') return res.redirect('/');
    var obj={name:req.body.name,idcategory:req.body.category,amount:req.body.amount,saleoff:req.body.saleoff,price:req.body.price,content:req.body.content,configuration:req.body.configuration}
    // console.log(obj);
    
    try {
        var a=await productModel.add(obj);
        // console.log('++++++++++++++++++++++');
        // console.log(a);
        // console.log(obj.name);
        var game= await productModel.idGame(obj.name);
        var idGame=game[0].id;
        // console.log('-------------');
        // console.log(idGame);

        console.log(req.body.images);
        var imageArray=req.body.images;
        for (let index = 0; index < imageArray.length; index++) {
            const element = imageArray[index];
            var image={idgame:idGame , linkimage:element};
            await imageModel.add(image);
        }

    } catch{

        err => { next(err) }
    } finally {
        res.redirect('/admin/products/all');

    }
})


router.post("/all/update", async (req, res, next) => {
    if (!req.user || req.user.username !== 'admin') return res.redirect('/');

    // console.log("asdfghjhgfdsdfghjhgfdsdfghjhgfdsdrftyuytrertyu");
    try {
        await productModel.update(req.body);
    } catch{
        err => { next(err) }
    } finally {
        res.redirect('/admin/products/all');

    }
})

router.post("/all/delete", async (req, res, next) => {
    // if (!req.user) 
    //     return res.redirect('/dang-nhap');
    // else if(req.user.type==='false')
    //     return res.redirect('/');
    // else
    //     return res.redirect('/admin/products/all')
    if (!req.user || req.user.username !== 'admin') return res.redirect('/dang-nhap');
    try {
        await productModel.delete("id", req.body.id)
    } catch{
        err => { next(err) }
    } finally {
        res.redirect('/admin/products/all');

    }
})

module.exports = router;
