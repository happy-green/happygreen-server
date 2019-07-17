const mongoose = require('mongoose');
const User = require('./User');

const ProfileSchema = new mongoose.Schema({
  _id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  Followers:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Follwers'
  },

  Followings:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Follwings'
  },
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

const FollowersSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  followers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],

})

const FollowingsSchmea = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  followings:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
})


// const PostSchema = new mongoose.Schema({

// })


// Sub models
const Followers = mongoose.model('Followers',FollowersSchema);
const Followings = mongoose.model('Follwings',FollowingsSchmea);

//const Posts = mongoose.model('Posts',PostSchema);

// main model
const Profile = mongoose.model('Profile',ProfileSchema);

module.exports = Profile;