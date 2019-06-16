var express = require("express");
var router = express.Router();
var categoryModel = require('../../models/categories.model')

router.get('/', (req, res) => {
    res.redirect('/admin/categories/all')
});


router.get('/all', (req, res) => {
    var p = categoryModel.all();
    // console.log("ahihi");
    // console.log(p);
    p.then(rows => {
        // console.log(rows);
        res.render('vCategories/all', {
            layout: 'layout_admin.hbs', categories: rows
        });
    })
});

router.post('/all', async (req, res, next) => {
    var obj = req.body;
    // var p;
    try {
        (Object.keys(obj).length == 1) ?
            await categoryModel.add(obj) :
            await categoryModel.update(obj)
    } catch{
        err => { next(err) }
    } finally {
        res.redirect('/admin/categories/all');

    }

    // console.log("Note:" + Object.keys(obj).length);
    // console.log(req.body);

});

router.post("/all/delete",async (req,res,next)=>{
    // console.log("asdfghjhgfdsdfghjhgfdsdfghjhgfdsdrftyuytrertyu");
    try {
        // console.log(req.body);
        await categoryModel.delete(req.body.id)
        // console.log(req.body);
    } catch{

        err => { next(err) }
    } finally {
        res.redirect('/admin/categories/all');

    }
})

module.exports = router;