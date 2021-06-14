const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const crypto = require('crypto');

const UserSchema= new mongoose.Schema({
    username: {
        type:String,
        required:[true, 'Please tell us your name!']
    },
    email: {
        type:String,
        required: [true, 'Please provide your email'],
        lowercase:true,
        trim: true
    },
    password:{
        type: String,
        required:[true, 'Please provide a password with 8 length character']
    },
    passwordConfirm:{
        type: String,
        required:[true, 'Please confirm your password']
    },
    photo:{
        type:String,
        default:'default.png'
    },
    passwordResetToken: String,
  passwordResetExpires: Date
})

UserSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,10);
    this.passwordConfirm=undefined;
    next();
})

UserSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };


  UserSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  

const User=mongoose.model('user',UserSchema);
module.exports=User;