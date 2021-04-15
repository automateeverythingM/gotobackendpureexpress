const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String },
    uid: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

module.exports = mongoose.model("User", UserSchema);
