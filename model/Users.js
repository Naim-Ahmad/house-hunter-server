const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  houses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "AllHouse",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
