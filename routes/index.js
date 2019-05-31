var express = require('express');
var router = express.Router();

var app_name = 'GINJSGame - Shop game số 1 VN'
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: app_name });
});
router.get('/xem-chi-tiet/', function(req, res, next) {
  res.render('xem-chi-tiet', { title: 'GINJSGame-Xem chi tiết' });
});
router.get('/danh-sach-san-pham-theo-loai/', function(req, res, next) {
  res.render('danh-sach-san-pham-theo-loai', { title:'GINJSGame - Danh sách sản phẩm' });
});
router.get('/tim-kiem/', function(req, res, next) {
  res.render('search', { title: 'GINJSGame-Tìm kiếm' });
});
router.get('/dang-ky/', function(req, res, next) {
  res.render('signup', { title:'GINJSGame - Đăng ký tài khoản' });
});

router.get('/dang-nhap/', function(req, res, next) {
  res.render('signin', { title:'GINJSGame - Đăng ký tài khoản' ,customStyleSheet:'stylesheets/signin.css'});
});

router.get('/cap-nhat-tai-khoan/', function(req, res, next) {
  res.render('updateinfo', { title:'GINJSGame - Cập nhật tài khoản' });
});
router.get('/cntk/', function(req, res, next) {
  res.render('updateinfo', { title:'GINJSGame - Cập nhật tài khoản' });
});

router.get('/quen-mat-khau/', function(req, res, next) {
  res.render('forgotpassword', { title:'GINJSGame - Lấy lại mật khẩu' });
});

module.exports = router;
