const jwt = require("jsonwebtoken");
const verify = (req, res, next) => {
  const sHeaders = req.headers.token;
  if (sHeaders) {
    const token = sHeaders.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) return res.status(501).json("your Not Auth...!");
      req.user = user;
      next();
    });
  } else {
    return res.status(501).json("your Not Auth...!");
  }
};
const verifyauth = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("Your Are Not Alowed...! ");
    }
  });
};
const verifyadmin = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("Your Are Not Alowed...! ");
    }
  });
};
module.exports = { verify, verifyauth, verifyadmin };
