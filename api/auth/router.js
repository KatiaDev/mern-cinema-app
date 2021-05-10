const router = require("express").Router();
const Users = require("../user/model");
const { validateNewUser } = require("../user/middleware");
const { checkUserRegister } = require("./middleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const message = require("../../services/email/message");
const twofactor = require("node-2fa");

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
      const newToken = twofactor.generateToken(process.env.SECRET_2FA);
      console.log("newToken", newToken);
      message.messageConfirmRegister(addedUser.email, addedUser._id, newToken);
      return res.status(200).send({
        message: "User was registered successfully! Please check your email",
      });
      //return res.status(200).json(addedUser);
    })
    .catch(next);
});

router.post("/login", checkUserRegister, async (req, res, next) => {
  const { _id, email, username, password, role, status } = req.user;
  /*
  if (req.user.status !== "Active") {
    return res
      .status(401)
      .json({ message: "Pending Account.Please verify your email!" });
  }*/

  const passwordValid = await bcrypt.compare(req.body.password, password);
  if (!passwordValid) {
    return res.status(401).json("Invalid credentials.");
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

  return res.status(200).json("SignIn Successful, Welcome to Olymp Cinema !!!");
});

router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json("Logout successful !!!");
  } catch (error) {
    next();
  }
});

// router.post sau router.get ???

router.post("/register-confirm/:token/:user_id", async (req, res, next) => {
  const result = twofactor.verifyToken(
    process.env.SECRET_2FA,
    req.params.token
  );
  console.log("Utilizatorul", req.params.user_id);
  console.log("Rezultat", result);

  result === 0
    ? res.status(200).json("vedem")
    : res.status(500).json("Sorry, invalid your token");
});

module.exports = router;
