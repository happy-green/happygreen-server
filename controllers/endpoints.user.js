const UserModel = require('../models/User');
const router = require('express').Router();
const UserProfile = require('../models/Profile');


// middlewares

const authMiddleware = require('../middlewares/middleware.auth');

// add data to profile

router.post('/update/',authMiddleware,async (req,res)=>{
  try{
    const userId = req.userID;
    const {fullName,gender} = req.body;

    const currentUser =  await UserProfile.findById(userId);
    const done  = await currentUser.update({FullName:fullName,Gender:gender})

    if(done) return res.status(200).json({msg:"Update Sucessfull"});
  }
  catch(e){
    return res.status(400).json({msg:"something went wrong"});
  }
})

// get user data

router.get('/',authMiddleware,async (req,res)=>{

  try{  
    const userId = req.userID;
    const user = await UserProfile.findById(userId);

    if(!user) return res.status(400).json({msg:"No such user"});

    return res.status(200).json({profile:user});
  }
  catch(er){
    return res.status(400).json({msg:"Something went wrong"})
  }
})


// update user bio

router.post('/update/bio',authMiddleware,async (req,res)=>{
  try{

    const userId = req.userID;
    const { userBio } = req.body;
  
    const user = await UserProfile.findById(userId);
    
    console.log(user);

    if(!user) return res.status(400).json({msg:"No such user"});
  
    const updateStatus = await user.updateOne({Bio:userBio});
  
    return res.status(200).json({msg:"Bio Updated successfully"});
  
  }
  catch(er){
    return res.status(400).json({msg:"Something went wrong"})
  }
})

// Follow someone

router.post('/follow',authMiddleware,async (req,res)=>{
  try{

    const userId = req.userID;
    const followUserId = req.body.followUserId;
  
    const currentUser = await UserProfile.findById(userId);

    currentUser.Followings.push(followUserId);
  
    const targetUser = await UserProfile.findById(followUserId);
    targetUser.Followers.push(userId);
  
    const followed = await currentUser.save();  
    const doneFollower = await targetUser.save();
  
    return res.status(200).json({msg:"User Followed"})
  }
  catch(err){
    return res.status(400).json({msg:"Something went wrong"})
  }
})

module.exports = router;