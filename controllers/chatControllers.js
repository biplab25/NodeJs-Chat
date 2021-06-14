const Chat= require('./../model/chatModel');
const { promisify } = require('util');
const jwt=require('jsonwebtoken');
const authController=require('./../controllers/authController');
const User=require('./../model/userModel');

exports.createChat=async(req,res,next)=>{
    if (req.cookies.jwt) {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
  
        // 2) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          return next();
        }
  
        // // 3) Check if user changed password after the token was issued
        // if (currentUser.changedPasswordAfter(decoded.iat)) {
        //   return next();
        // }
  
        // THERE IS A LOGGED IN USER
        //res.locals.user = currentUser;
        req.user = currentUser;
    const newChat=await Chat.create({
        messege: req.body.messege,
        messegername: req.user.username
    })
    //console.log(req.user);
    req.flash('success', 'Successfull!! Your Masseges Added');
    res.redirect('/chat');
    // res.status(201).json({
    //     status:'success',
    //     newChat
    // })
}
  };

