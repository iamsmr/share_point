const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please Enter Your Name"],
    minlength: 3,
    maxlength: 200,
  },
  userEmail: {
    type: String,
    required: [true, "Please Enter Your Email"],
    lowercase: true,
    unique: true,
    minlength: 4,
  },
  userPassword: {
    type: String,
    required: [true, "Pleae Enter You Passwrod"],
    minlength: [6, "Minimum Password Length is 6"],
    maxlength: 250,
  },
});

// This Function Hash The User Passowrd
userSchema.pre("save", async function (next) {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(this.userPassword, salt);
  this.userPassword = hashedPassword;
  next();
});

// This Function Generate Json Web Token (Jwt for authentication)
userSchema.methods.generateJsonWebToken = function (user) {
  return jwt.sign({ id: user._id }, "API_KEY");
};

//This function login in the user
userSchema.statics.login = async function (userEmail, userPassword) {
  const getUserFromMongodDB = await this.findOne({ userEmail });
  if (!userEmail) throw Error("userEmail empty");
  if (!userPassword) throw Error("password empty");
  if (!getUserFromMongodDB) throw Error("Invalid UserEmail");
  const checkUserPasswordForLogin = await bcryptjs.compare(
    userPassword,
    getUserFromMongodDB.userPassword
  );
  if (checkUserPasswordForLogin) return getUserFromMongodDB;
  throw Error("Invalid userPassword");
};

const User = mongoose.model("users", userSchema);

module.exports.User = User;
