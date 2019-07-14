const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const assert = require('assert');
const saltRounds = 10;



router.post('/register',(req,res)=>{
  // Look for existing users
  const {UserName,Email,Password} = req.body;
  User.findOne({Email},(err,user)=>{
    if(err) return;
    if(user) res.send("User with this email already exists");
    else{
      // Create new user if doesnot exist

      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(Password,salt);
      const NewUser = new User({UserName,Email,Password:hash});
      let error = NewUser.validateSync();


      // if email format is not proper throw error
      if(error && !assert.equal(error.errors['Email'].message,`${Email} is not a valid email`)){
        res.send({error:"Please Enter a proper email"})
        return;
      }
      
      NewUser.save((err,document)=>{
        if(err) return;
        console.log("User created Successfully");
        res.send({status:"User Created Successfully"})
      })

    }
  })
})

router.post('/login',(req,res)=>{
  const {Email,Password} = req.body;
  User.findOne({Email},(err,user)=>{
    if(err){
      res.send({data:"Something went wrong"});
      return;
    }

    if(!user){
      res.send({status:"User with this email doesnot exist"});
      return;
    }

    const passwordMatch = bcrypt.compareSync(Password,user.Password);
    
    // check for correct password

    if(!passwordMatch){
      res.send({error:"Password is invalid. Please Enter Correct Password"});
      return;
    }
    res.send({status:"User Verified Successfully"});
  })
})

module.exports = router;