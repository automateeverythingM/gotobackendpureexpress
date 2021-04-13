const mongoose = require("mongoose");

exports.UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
