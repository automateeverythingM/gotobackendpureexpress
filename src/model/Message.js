const mongoose = require("mongoose");
const { UserSchema } = require("./user");

exports.mongooseMessageSchema = mongoose.Schema({
  text: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Message", MessageSchema);
