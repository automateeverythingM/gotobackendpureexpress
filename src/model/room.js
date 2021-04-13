const mongoose = require("mongoose");
const { UserSchema } = require("./User");
const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      UserSchema,
    },
  ],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("Room", RoomSchema);
