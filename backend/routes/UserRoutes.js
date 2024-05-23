const express = require("express");
const router = express.Router();

//Controller
const { register } = require("../controllers/UserController");

//mildewares
const validate = require("../middlewares/handleValidation");
const { userCreateValidation } = require("../middlewares/UserValidation");
//Routes
router.post("/register", userCreateValidation(), validate, register);

module.exports = router;
