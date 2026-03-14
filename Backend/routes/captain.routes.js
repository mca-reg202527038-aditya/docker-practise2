const express = require("express");
const router = express.Router();
const captaincontroller = require("../controllers/captain.controller");
const AuthCaptain=require("../middlewares/auth.middleware")

router.post("/register",captaincontroller.registerCaptain);
router.post("/login",captaincontroller.loginCaptain);
router.get("/profile",AuthCaptain.authCaptain,captaincontroller.getProfile)
router.get("/logout",AuthCaptain.authCaptain,captaincontroller.logoutCaptain)

module.exports = router;
