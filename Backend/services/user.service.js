const userModel = require("../models/user.model");

module.exports.createUSer = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  const user = userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });
  return user;
};
