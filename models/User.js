const mongoose = require('mongoose');
const UserProfile = require('./Profile');

const UserSchema = new mongoose.Schema({
  UserName:String,
  Email:{
    type:String,
    validate:{
      validator:function(v){
        return 	/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
      },
      message:props=>`${props.value} is not a valid email`
    },
    required:[true,"Email is required"]
  },
  Password:String,
  EmailVerified:{
    default:false,
    type:Boolean
  },
  Profile:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Profile'
  }
})

const User = mongoose.model('User',UserSchema);
module.exports = User;