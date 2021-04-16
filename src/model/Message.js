const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  content: {
    type: String,
  },
  uid: {
    type: String,
  },
  user: { type: String, ref: "User" },
  type: {
    name: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Message", MessageSchema);
