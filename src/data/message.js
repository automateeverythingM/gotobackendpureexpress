const mongoose = require('mongoose');
const {UserSchema} = require("./user");
const {RoomSchema} = require("./room");


const MessageSchema = new mongoose.Schema({
    room: {
        type: RoomSchema,
        required: true,
    },
    user:{
        type: UserSchema,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        minLength:1,
        maxLength: 1000
    }
    
})
const Message = mongoose.model("Message", MessageSchema);
exports.Message = Message;
exports.MessageSchema = MessageSchema;