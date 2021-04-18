const express = require("express");

const News = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const news = await News.find().exec();
    res.status(200).json(news);
  } catch (err) {
    next(err);
  }
});

router.get("/:news_id", async (req, res, next) => {
  try {
    const foundArticle = await News.findById(req.params.news_id).exec();
    res.status(200).json(foundArticle);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newArticle = await new News(req.body).save();
    res.status(201).json(newArticle);
  } catch (err) {
    next(err);
  }
});

router.put("/:news_id", async (req, res, next) => {
  const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
    if (req.body[curr]) {
      acc[curr] = req.body[curr];
    }
    return acc;
  }, {});
  try {
    const updatedArticle = await News.findOneAndUpdate(
      req.params.news_id,
      bodyReducer
    ).exec();
    res.status(200).json(updatedArticle);
  } catch (err) {
    next(err);
  }
});

router.delete("/:news_id", async (req, res, next) => {
  try {
    const deletedArticle = await News.findByIdAndDelete(
      req.params.news_id
    ).exec();
    res.status(200).json(deletedArticle);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
