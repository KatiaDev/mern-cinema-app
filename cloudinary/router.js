const cloudinary = require("cloudinary").v2;
const router = require("express").Router();

router.post("/upload-image", (req, res) => {
  const data = {
    image: req.body.image,
  };

  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      res.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "failure",
        err,
      });
    });
});

router.post("/upload-video", (req, res) => {
  const data = {
    video: req.body.video,
  };

  cloudinary.uploader
    .upload(data.video, {
      resource_type: "video",
      chunk_size: 6000000,
    })
    .then((result) => {
      res.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "failure",
        err,
      });
    });
});
module.exports = router;
