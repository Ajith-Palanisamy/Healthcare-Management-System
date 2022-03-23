const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    //return res.status(401).send("Required Token");
    return res.render('home',{msg:"Your session has expired.So Please Login"});
  }
  try {
    const decoded = jwt.verify(token, process.env.TOC);
    console.log(decoded);
    //iat-issued at
    //decoded=>{email: 'ajithkumar6382pmp@gmail.com',id: '61fd5ccb6899421cc2ac2b6e',iat: 1644418538,exp: 1644425738 }
    req.user = decoded.email;
  } catch (err) {
    //return res.status(401).send("Invalid Token");
    return res.render('home',{msg:"Invalid Token.Please Login"});
  }
  return next();
};

module.exports = verifyToken;