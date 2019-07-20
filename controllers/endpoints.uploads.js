const router = require('express').Router();
const Profile = require('../models/Profile');
const authMiddleware = require('../middlewares/middleware.auth');
const multer = require('multer');

const uploads = multer({dest:'./uploads/'})

router.post('/',uploads.single(),(req,res)=>{
  console.log(req.files);

  // req.files contains files

  // req.body contains text fields

})

module.exports = router;