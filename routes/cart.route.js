var express = require("express");
var router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/', cartController.home);

router.post('/add-to-cart',cartController.addToCart);
router.post('/remove',cartController.remove);

module.exports = router;







