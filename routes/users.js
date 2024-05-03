const mongoose =require('mongoose');
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/miniwhats");


const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profileImage: {
    type: String,
    default: "http://cdn.onlinewebfonts.com/svg/img_258083.png"
  }
})

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema)
