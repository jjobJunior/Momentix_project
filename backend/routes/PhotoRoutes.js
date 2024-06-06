const express = require("express");
const router = express.Router();

//controller
const {
  insertPhoto,
  deletePhoto,
  gatAllphotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
} = require("../controllers/PhotoController");

const {
  photoInsertValidation,
  photoUpdateValidation,
} = require("../middlewares/photoValidation");
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
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/:id", authGuard, getPhotoById);
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);
router.put("/like/:id", authGuard, likePhoto);

module.exports = router;
