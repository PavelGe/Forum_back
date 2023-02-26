const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, min: 3 },
});

module.exports = mongoose.model("Users", userSchema);
