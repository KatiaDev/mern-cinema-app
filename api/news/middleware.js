const { check, validationResult } = require("express-validator");
const News = require("./model");

const validateNews = async (req, res, next) => {
  await check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 5 })
    .withMessage("Title must have minimum length of 5 characters.")
    .run(req);

  await check("subtitle")
    .trim()
    .notEmpty()
    .withMessage("Subtitle is required.")
    .isLength({ min: 5 })
    .withMessage("Subtitle must have minimum length of 5 characters.")
    .run(req);

  await check("image_url")
    .trim()
    .notEmpty()
    .withMessage("Image field is required.")
    //.isURL()
    //.withMessage("Invalid value type. Must be a URL.")
    .run(req);

  await check("content")
    .trim()
    .notEmpty()
    .withMessage("Content field can't be empty.")
    .isLength({ min: 50 })
    .withMessage("Content must have minimum length of 50 characters.")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  } else {
    next();
  }
};

const checkNewsExists = async (req, res, next) => {
  try {
    const foundArticle = await News.findById(req.params.news_id).exec();
    if (!foundArticle) {
      return res.status(404).json({ message: "Not found." });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { validateNews, checkNewsExists };
