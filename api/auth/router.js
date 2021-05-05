const router = require("express").Router();
const Users = require("../user/model");
const { validateNewUser } = require("../user/middleware");
const { checkUserRegister } = require("./middleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", validateNewUser, async (req, res, next) => {
  const {
    firstname,
    lastname,
    age,
    email,
    username,
    password,
    mobile,
  } = req.body;

  new Users({
    firstname,
    lastname,
    age,
    email,
    username,
    password: await bcrypt.hash(password, 14),
    mobile,
  })
    .save()
    .then((addedUser) => {
      res.status(200).json(addedUser);
    })
    .catch(next);
});

router.post("/login", checkUserRegister, async (req, res, next) => {
  const { _id, email, username, password, role } = req.user;
  const passwordValid = await bcrypt.compare(req.body.password, password);
  if (!passwordValid) {
    return res.status(401).json("Invalid credentials");
  }

  const token = jwt.sign(
    {
      _id,
      username,
      email,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("token", token);

  return res.status(200).json("SingIn Succesful, welcome to Olymp Cinema !!!");
});

router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json("Logout successful !!!");
  } catch (error) {
    next();
  }
});

module.exports = router;
