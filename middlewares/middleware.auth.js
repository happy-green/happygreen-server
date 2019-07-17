const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

// protects routes..

const checkToken = (req,res,next) => {
  const token = req.header("x-auth-token");
  if(!token) return res.status(400).json({msg:"Nahh.... we need a token bro"});
  try {
    const decoded = jwt.verify(token,"mySecret");    
    req.userID = decoded.id;
    return next();
  } 
  catch (e) {
    console.log(e);
    return res.status(400).json({msg:"Invalid shit"})
  }
}


module.exports = checkToken;