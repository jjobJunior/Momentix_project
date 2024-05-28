const express = require("express");
const router = express.Router();

//Controller
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/UserController");

//mildewares
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
} = require("../middlewares/userValidation");
const authGuard = require("../middlewares/AuthGuard");
//Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);

module.exports = router;
