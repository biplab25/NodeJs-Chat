const Movie = require("../model/movieModel");
const Chat= require('./../model/chatModel');

exports.getLoginForm=(req,res)=>{
    res.status(200).render('login', {
        title: 'Log into your account'
      });
}

exports.getSignUpForm=(req,res)=>{
  res.status(200).render('signup', {
      title: 'Register your account'
    });
}

// exports.getOverview=(req,res)=>{
//   res.status(200).render('overview', {
//       title: 'Flow Of Movie'
//     });
// }

exports.getSubscribe=(req,res)=>{
  res.status(200).render('subscribe', {
      title: 'Subscribe'
    });
}

exports.yourVideo=(req,res)=>{
  res.status(200).render('video', {
      title: 'video'
    });
}

exports.uploadVideo=(req,res)=>{
  res.status(200).render('movies', {
      title: 'Upload Movie details'
    });
}

exports.getOverview=async(req,res)=>{
  const movies=await Movie.find()
  res.status(200).render('overview', {
      title: 'All Movies',
      movies
    });
}

exports.getChat=async(req,res)=>{
  const chats=await Chat.find()
  res.status(200).render('chat', {
      title: 'All Chats',
      chats
    });
}

exports.getforgotPassword=(req,res)=>{
  res.status(200).render('forgotPassword', {
      title: 'Forgot Password'
    });
}

exports.getresetPassword=(req,res)=>{
  res.status(200).render('resetPassword', {
      title: 'Reset Password'
    });
}