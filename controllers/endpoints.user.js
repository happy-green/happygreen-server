const UserModel = require('../models/User');
const router = require('express').Router();

// middlewares

const authMiddleware = require('../middlewares/middleware.auth');

// add data to profile

router.post('/update/',authMiddleware,(req,res)=>{
  const userId = req.userID;
  
  console.log(userId);
  
  const {firstName,lastName,gender} = req.body;

  UserModel.findById(userId,(err,user)=>{
    if(err) return res.status(400).json({msg:"something went wrong"});

    // user found
    

    user.update({FirstName:firstName,LastName:lastName,Gender:gender},(err,data)=>{
      if(err) return res.status(400).json({msg:"Update failed"});

      return res.status(200).json({msg:"Update Sucessfull"});
    })
    
  })
})

// get user data

router.get('/',authMiddleware,(req,res)=>{
  const userId = req.userID;

  UserModel.findById(userId,(err,user)=>{
    if(err) return res.status(400).json({msg:"something went wrong"});

    if(!user) return res.status(400).json({msg:"No such user"});

    return res.status(200).json({user});
  })
  .select("-Password")
  .select("-EmailVerified");
})


// update user bio

router.post('/update/bio',authMiddleware,(req,res)=>{
  const userId = req.userID;


  UserModel.findById(userId,(err,user)=>{
    if(err) return res.status(400).json({msg:"something went wrong"});

    if(!user) return res.status(400).json({msg:"No such user"});

    const {userBio} = req.body;
    user.updateOne({Bio:userBio},(err,data)=>{
      if(err) return res.status(400).json({msg:"something went wrong"});
      
      return res.status(200).json({msg:"Bio Updated successfully"});
    })
  })
})

module.exports = router;