const express = require("express");
const router = express.Router();

//Controller
const { register, login } = require("../controllers/UserController");

//mildewares
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
} = require("../middlewares/UserValidation");
//Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);

module.exports = router;
