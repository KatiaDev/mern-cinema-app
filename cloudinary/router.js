const cloudinary = require("cloudinary").v2;
const router = require("express").Router();

// *** image upload ***

router.post("/upload-image", async (req, res) => {
  const data = {
    image: req.body.image,
  };

  cloudinary.uploader
    .upload(data.image, {
      folder: "movies",
      use_filename: true,
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

// *** video upload ***

router.post("/upload-video", async (req, res) => {
  const data = {
    video: req.body.video,
  };

  cloudinary.uploader
    .upload(data.video, {
      resource_type: "video",
      folder: "movies",
      use_filename: true,
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

// *** display image ***

router.get("/get-image/:id", async (req, res) => {
  try {
    const foundImage = await cloudinary.image(req.params.id, {
      width: 150,
      height: 300,
      crop: "fill",
      secure: true,
    });
    res.status(200).send(foundImage);
  } catch (err) {
    res.status(500).send({
      message: "failure",
      err,
    });
  }
});

// *** play video ***

router.get("/get-video/:id", async (req, res) => {
  try {
    const foundVideo = await cloudinary.video(req.params.id, {
      controls: true,
    });
    res.status(200).send(foundVideo);
  } catch (err) {
    res.status(500).send({
      message: "failure",
      err,
    });
  }
});

// *** delete image ***

router.delete("/delete-image/:id", async (req, res) => {
  cloudinary.uploader
    .destroy(req.params.id)
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

// *** delete video ***

router.delete("/delete-video/:id", async (req, res) => {
  cloudinary.uploader
    .destroy(req.params.id, { resource_type: "video" })
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
