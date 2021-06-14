const mongoose = require('mongoose');
const chatSchema=new mongoose.Schema({
    messege:{
        type: String,
        required: true
    },
    messegername:{
        type: String,
        required: true
    },
    createdAt: {
        default: Date.now(),
        type: Date
    }
})

const Chat=mongoose.model('chat',chatSchema);
module.exports=Chat;