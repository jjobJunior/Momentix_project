const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

//Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  //Create photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  // if photo was creatd successfully
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Ocorreu um erro. Tente mais tarde!"],
    });
    return;
  }

  res.status(201).json(newPhoto);
};

//Remove photo from db
const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;
  try {
    const photo = await Photo.findById(id);

    //check photo exists
    if (!photo) {
      res.status(404).json({
        errors: ["Foto não encontrada inexistente"],
      });
      return;
    }

    //check photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde!"] });
      return;
    }
    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluida com sucesso!" });
  } catch (error) {
    res.status(404).json({
      errors: ["Foto não encontrada error id"],
    });
    return;
  }
};

//Get all photos
const gatAllphotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

//Get photo user
const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();
  return res.status(200).json(photos);
};

//Get photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(id);

  //check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
  res.status(200).json(photo);
};

//Update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  //check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  //check photo belongs to user
  if (!photo.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde!"] });
    return;
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();
  return res
    .status(200)
    .json({ photo, message: "Foto atualizada com sucesso!" });
};

module.exports = {
  insertPhoto,
  deletePhoto,
  gatAllphotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
};
