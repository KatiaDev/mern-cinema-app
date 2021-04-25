const News = require("./model");

const validateNews = (req, res, next) => {
  const { title, subtitle, image_url, content, date } = req.body;
  if (!title || !subtitle || !image_url || !content || !date) {
    return res.status(400).json({ message: "Missing required field." });
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
