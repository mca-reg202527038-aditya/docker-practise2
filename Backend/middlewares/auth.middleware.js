const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistmodel = require("../models/blacklisttoken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const blacklisted = await blacklistmodel.findOne({ token: token });

  if (blacklisted) {
    return res.status(401).json({ message: "unauthorisez" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "un" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const blacklisted = await blacklistmodel.findOne({ token: token });

  if (blacklisted) {
    return res.status(401).json({ message: "unauthorisez" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "un" });
  }
};
