const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

//gENERATE USER TOKEN
const generateTokn = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

//Register user sign in
const register = async (req, res) => {
  res.send("Registro");
};

module.exports = {
  register,
};
