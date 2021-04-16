const mongoose = require("mongoose");
const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      type: String,
      ref: "User",
    },
  ],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
