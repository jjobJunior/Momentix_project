const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O titulo é obrigatorio!")
      .isString()
      .withMessage("O titulo é obrigatorio!")
      .isLength({ min: 3 })
      .withMessage("O titulo deve conter no minimo 3 caracteres!"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagm é obrigatória!");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O titulo é obrigatorio!")
      .isLength({ min: 3 })
      .withMessage("O titulo deve conter no minimo 3 caracteres!"),
  ];
};

const photoCommentValidation = () => {
  return [body("comment").isString().withMessage(" comentario é obrigatorio!")];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  photoCommentValidation,
};
