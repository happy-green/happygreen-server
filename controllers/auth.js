const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const assert = require('assert');
const jwt = require('jsonwebtoken');

const secret = "mySecret"; // TODO: Put this in a seperate config file.
const saltRounds = 10;

// Route to handle user registeration

router.post('/register',(req,res)=>{
  // Look for existing users
  const {UserName,Email,Password} = req.body;
  User.findOne({Email},(err,existing_user)=>{
    if(err) return;
    if(existing_user) res.status(400).json({msg:"User with this email already exists"});
    else{
      // Create new user if doesnot exist

      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(Password,salt);
      const NewUser = new User({UserName,Email,Password:hash});
      let error = NewUser.validateSync();


      // if email format is not proper throw error
      if(error && !assert.equal(error.errors['Email'].message,`${Email} is not a valid email`)){
        return res.status(400).json({error:"Please Enter a proper email"})
        
      }
      
      NewUser.save((err,document)=>{
        if(err) return res.status(400).json({msg:"Error Creating user"});
        
        // generate token 

        jwt.sign({id:document.id},secret,(err,token)=>{

          if(err) return res.status(400).json({msg:"Something went wrong"})
          
          const sendData = {
            token,
            user:{
              username:document.UserName,
              email:document.Email,
              id:document.id
            }
          }
          return res.status(200).json(sendData)
        })
      })
    }
  })
})


// routes to handle user login

router.post('/login',(req,res)=>{
  const {Email,Password} = req.body;
  
  User.findOne({Email},(err,user)=>{
    if(err) return res.status(400).json({msg:"Something went wrong"})

    if(!user) return res.status(400).json({msg:"User with this email doesnot exist"});

    const passwordMatch = bcrypt.compareSync(Password,user.Password);
    // check for correct password
    
    if(!passwordMatch) res.status(400).json({error:"Password is invalid. Please Enter Correct Password"});
    // sign a jwt and send it to client

    jwt.sign({id:user.id},secret,(err,token)=>{

      if(!token) return res.status(400).json({msg:"Something went wrong"});
      
      // send token and user data

      const sendData = {
        token,
        user:{
          username:user.UserName,
          email:user.Email,
          id:user.id
        }
      }
      
      return res.status(200).json(sendData);
    })
  })
})

module.exports = router;  