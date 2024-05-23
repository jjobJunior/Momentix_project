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
  const { name, email, password } = req.body;

  //checagem se usuario existe
  const user = await User.findOne({ email });
  if (user) {
    res.status(422).json({ errors: ["Este e-mail ja esta cadastrado"] });
    return;
  }
  //Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // create User
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  //if user was created successfully, return the ttoken
  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }
  res.status(201).json({
    _id: newUser._id,
    token: generateTokn(newUser._id),
  });
};

const login = (req, res) => {
  res.send("Login");
};

module.exports = {
  register,
  login
};
