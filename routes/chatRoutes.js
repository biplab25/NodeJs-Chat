const express = require('express');
const chatController=require('./../controllers/chatControllers');
const router=express.Router();
router.post('/chat',chatController.createChat);
module.exports=router;