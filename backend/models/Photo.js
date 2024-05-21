const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema(
  {
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjctId,
    userName: String,
  },
  {
    timestamps: true,
  }
);

const Photo = mongoose.model("photo", photoSchema);

module.exports = Photo;
