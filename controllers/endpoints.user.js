const UserModel = require('../models/User');
const router = require('express').Router();
const UserProfile = require('../models/Profile');


// middlewares

const authMiddleware = require('../middlewares/middleware.auth');

// add data to profile

router.post('/update/',authMiddleware,(req,res)=>{
  const userId = req.userID;
  
  console.log(userId);
  
  const {fullName,gender} = req.body;

  UserProfile.findById(userId,(err,user)=>{
    if(err) return res.status(400).json({msg:"something went wrong"});

    // user found    

    user.update({FullName:fullName,Gender:gender},(err,data)=>{
      if(err) return res.status(400).json({msg:"Update failed"});

      return res.status(200).json({msg:"Update Sucessfull"});
    })

    
  })
})

// get user data

router.get('/',authMiddleware,(req,res)=>{
  const userId = req.userID;

  console.log(userId)
  UserProfile.findById(userId,(err,user)=>{
    if(err) return res.status(400).json({msg:"something went wrong"});

    if(!user) return res.status(400).json({msg:"No such user"});

    return res.status(200).json({profile:user});
  })
})


// update user bio

router.post('/update/bio',authMiddleware,(req,res)=>{
  const userId = req.userID;


  UserProfile.findById(userId,(err,user)=>{
    if(err) return res.status(400).json({msg:"something went wrong"});

    if(!user) return res.status(400).json({msg:"No such user"});

    const {userBio} = req.body;
    user.updateOne({Bio:userBio},(err,data)=>{
      if(err) return res.status(400).json({msg:"something went wrong"});
      
      return res.status(200).json({msg:"Bio Updated successfully"});
    })
  })
})

/* 
  Follow someone..

  if i follow my friend..
    Add him in my followings and add me in his followers
*/

router.post('/follow',authMiddleware,(req,res)=>{
  const userId = req.userID;
  const followUserId = req.body.followUserId;


  UserProfile.findById(userId,(err,user)=>{
    if(err) return res.status(400).json({msg:"Some thing went wrong"});

    user.Followings.push(followUserId);
    
    user.save((err,success)=>{
      if(err) return res.status(400).json({msg:"Error"});

      UserProfile.findById(followUserId,(err,TargetUser)=>{

        if(err) return res.status(400).json({msg:"Some thing went wrong"});

        TargetUser.Followers.push(userId);

        TargetUser.save((err,u)=>{
          if(err) return res.status(400).json({msg:"Some thing went wrong"});
          
          return res.status(200).json({msg:"User Followed"})
        })
      })
    })
  })
})

module.exports = router;