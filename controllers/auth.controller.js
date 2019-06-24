const passport = require("passport");
const userModel = require("../models/users.model");
const md5 = require("md5");

module.exports = {
  loginGet: (req, res, next) => {
    if (req.user) res.redirect("/");
    else {
      const data = {
        isSignInPage: true
      };
      res.render("account/sign_in", {
        title: "GINJSGame - Đăng ký tài khoản",
        customStyleSheet: "/stylesheets/signin.css",
        data
      });
    }
  },
  registerGet: (req, res, next) => {
    if (req.user) res.redirect("/");
    else {
      const data = {};
      data.isSignUpPage = true;
      res.render("account/sign_up", { title: "Đăng ký", data });
    }
  },
  accountRecovery: (req, res) => {
    if (req.user) res.redirect("/");
    else {
      res.render("forgotpassword", { title: "Khôi phục mật khẩu" });
    }
  },

  registerPost: async (req, res, next) => {
    // console.log(req.body);
    const user = await userModel.getUserByUsername(req.body.username);
    // console.log(user);
    if (user[0]) {
      const data = {
        cache: req.body,
        error: "username đã được sử dụng"
      };
      return res.render("signup", { title: "Ginjsgames - đăng ký", data });
    }
    const newUser = {
      username: req.body.username,
      password: md5(req.body.password),
      fullname: req.body.fullname,
      email: req.body.email
    };
    // console.log(newUser);
    const result = await userModel.add(newUser);
    if (result) {
      // console.log(result);
      // console.log("tạo thành công");
      passport.authenticate("local", (err, newUser) => {
        req.logIn(newUser, errLogIn => {
          if (errLogIn) {
            console.log("không đăng nhập được " + errLogIn);
          }
          return res.redirect("/");
        });
      })(req, res, next);
    } else {
      const data = {
        cache: req.body,
        error:
          "Xin lỗi, hệ thống không thể tạo tài khoản cho bạn, vui lòng thử lại :/"
      };
      return res.render("signup", { title: "Ginjsgames - đăng ký", data });
    }
  },
  logout: (req, res, next) => {
    req.logout();
    res.redirect("/");
  }
};
