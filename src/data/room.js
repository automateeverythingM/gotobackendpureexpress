const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    date: {
        type:Date,
        default: Date.now
    },
    // Maximum Number of Users reached in this room (Purpose: listing rooms by popularity)
    maxNumber:{
        type: Number,
        default: 0
    },
    private: Boolean
})
const Room = mongoose.model("Room", RoomSchema);
exports.Room = Room;
exports.RoomSchema = RoomSchema;