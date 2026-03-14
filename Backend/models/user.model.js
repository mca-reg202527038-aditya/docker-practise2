const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be of 3 length"],
    },
    lastname: {
      type: String,
      minlength: [3, "First name must be of 3 length"],
    },
  },
  email: {
    type: String,
    required: true,
    minlength: [5, "minimum 5 required"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  sockedId: {
    type: String,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_Secret, {
    expiresIn: "24h",
  });
  return token;
};

UserSchema.methods.ComparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", UserSchema);
module.exports = userModel;
