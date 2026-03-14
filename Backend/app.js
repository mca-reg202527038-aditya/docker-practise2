const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const app = express();
const connectDB = require("./db/db");
const userRoutes = require("./routes/user.routes");
const cookieparser = require("cookie-parser");
const captainRoutes = require("./routes/captain.routes");
connectDB();
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get("/", function (req, res) {
  res.send("HEllo");
});

app.use("/users", userRoutes);
app.use("/captain", captainRoutes);

module.exports = app;
