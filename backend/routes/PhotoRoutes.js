const express = require("express");
const router = express.Router();

//controller
const {
  insertPhoto,
  deletePhoto,
  gatAllphotos,
} = require("../controllers/PhotoController");

const { photoInsertValidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");

//Routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, gatAllphotos);

module.exports = router;
