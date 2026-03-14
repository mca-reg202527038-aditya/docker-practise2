const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blacklisttoken = require("../models/blacklisttoken.model");

module.exports.registerCaptain = async (req, res, next) => {
  const { fullname, email, password, vehicle } = req.body;

  const hashPassword = await captainModel.hashPassword(password);
  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = await captain.generateAuthToken();
  res.status(201).json({
    token,
    captain,
  });
};

module.exports.loginCaptain = async (req, res, next) => {
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "invalid" });
  }

  const isMatch = await captain.ComparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "invalid" });
  }

  const token = await captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

module.exports.getProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

module.exports.logoutCaptain=async(req,res,next)=>{
  res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  
    await blacklisttoken.create({ token });
  
    res.status(200).json({ message: "Logout" });
}
