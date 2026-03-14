const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Minimum 3 length required"],
    },
    lastname: {
      type: String,
      minlength: [3, "Minimum 3 required"],
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowecarse: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "minium 3 required"],
    },
    plate: {
      type: Number,
      required: true,
      minlength: [3, "minium 3 required"],
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "minium 1 required"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "auto", "motorcycle"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_Secret, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.ComparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);
module.exports = captainModel;
