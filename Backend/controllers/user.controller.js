const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const authMiddleware = require("../middlewares/auth.middleware");
const blacklisttoken = require("../models/blacklisttoken.model");

module.exports.registerUser = async function (req, res, next) {
  const { fullname, email, password } = req.body;
  const hashPassword = await userModel.hashPassword(password);
  const user = await userService.createUSer({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({
    token,
    user,
  });
};

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  const isMatch = await user.ComparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({
    token,
    user,
  });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blacklisttoken.create({ token });

  res.status(200).json({ message: "Logout" });
};
