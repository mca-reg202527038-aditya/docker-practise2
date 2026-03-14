const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(process.env.Mongo_uri);
  console.log("Connected to DB");
}

module.exports = connectDB;
