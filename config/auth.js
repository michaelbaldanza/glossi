const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  console.log(`AUTH????`)
  let token = req.get('Authorization') || req.query.token || req.body.token;
  console.log(`trying token in auth`)
  console.log(token);
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        next(err);
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    next();
  }
};