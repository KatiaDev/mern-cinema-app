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

module.exports = router;
