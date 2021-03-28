const mongoose = require('mongoose');
const {UserSchema} = require("./user");
const {MessageSchema} = require("./message");

const ChatSchema = new mongoose.Schema({
    users:[UserSchema],
    messages: [MessageSchema],
    created_at: {
        type: Date,
        default: Date.now
    }
})
const Chat = mongoose.model("Chat", ChatSchema);

exports.Chat = Chat;
exports.ChatSchema = ChatSchema;