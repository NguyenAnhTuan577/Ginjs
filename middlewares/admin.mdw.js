module.exports = (req, res) => {
  if (!req.signedCookies.userId) {
    res.redirect("/dang-nhap");
    return;
  }
  next();
};
