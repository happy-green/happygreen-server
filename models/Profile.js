const mongoose = require('mongoose');
const User = require('./User');

const ProfileSchema = new mongoose.Schema({
  _id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  Followers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Profile'
  }],

  Followings:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Profile'
  }],

  Posts:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Posts'
  },
  Private:{
    type:Boolean,
    default:false
  },
  Age:Number,
  FullName:String,
  Bio:String,
  Gender:String,
})



// const PostSchema = new mongoose.Schema({

// })



//const Posts = mongoose.model('Posts',PostSchema);

// main model
const Profile = mongoose.model('Profile',ProfileSchema);

module.exports = Profile;