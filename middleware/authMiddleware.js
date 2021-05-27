const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
  const token = req.cookies.myJwt;

  if(token) {
    jwt.verify(token, 'od-grn-jazz line bot', (err, decodedToken) => {
      if(err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    })
  } else {
    res.redirect('/login');
  }
}

// ログインしているユーザ情報の取得
const checkUser = (req, res, next) => {
  const token = req.cookies.myJwt;

  if(token) {
    jwt.verify(token, 'od-grn-jazz line bot', async (err, decodedToken) => {
      if(err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    })
  } else {
    res.locals.user = null;
    next();
  }
}

module.exports = { requireAuth, checkUser };