const express = require('express');
const authController=require('./../controllers/authController');
const router=express.Router();

router.post('/signup',authController.postSignup);
router.post('/login',authController.postLogin);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
module.exports=router;