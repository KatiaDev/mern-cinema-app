const router = require("express").Router();
const Users = require("../user/model");
const { validateNewUser } = require("../user/middleware");
const {
  registeredAccess,
  checkUserRegister,
  сheckConfirmationRegister,
  validateUserOnPasswordReset
} = require("./middleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const message = require("../../services/email/message");
const twofactor = require("node-2fa");
const mongoose = require("mongoose");

router.post("/register", validateNewUser, async (req, res, next) => {
  const { firstname, lastname, age, email, username, password, mobile } =
    req.body;

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
      message.messageConfirmRegister(addedUser.email, addedUser._id, newToken);
      return res.status(200).send({
        message: "User was registered successfully! Please check your email",
      });
      //return res.status(200).json(addedUser);
    })
    .catch(next);
});

router.post(
  "/login",
  checkUserRegister,
  async (req, res, next) => {
    const { _id, email, username, password, role, status } = req.user;


  
    const passwordValid = await bcrypt.compare(req.body.password, password);
    if (!passwordValid) {
      return res.status(401).json("%Invalid credentials%");
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
    //res.cookie("token", token);

    return res.status(200).json({
      message: "SignIn Successful, Welcome to Olymp Cinema !!!",
      token,
      role,
    });
  }
);

router.get("/logout", async (req, res, next) => {
  try {
    res.status(200).json("Logout successful !!!");
  } catch (error) {
    next();
  }
});

router.get("/check-auth", registeredAccess, (req, res) => {
  res.status(200).json({ message: "Logged in." });
});

router.post(
  "/register-confirm/:token/:user_id",
  сheckConfirmationRegister,
  async (req, res, next) => {
    const result = twofactor.verifyToken(
      process.env.SECRET_2FA,
      req.params.token,
      (window = 35) //minut
    );
    console.log(result);

    if (!result || !mongoose.Types.ObjectId.isValid(req.params.user_id)) {
      return res.status(500).json("Sorry, invalid token.");
    } else {
      await Users.findByIdAndUpdate(req.params.user_id, {
        status: "Active",
      })
        .exec()
        .then((user) => {
          return res
            .status(200)
            .json("Your account was successfully activated.");
        });
    }
  }
);

// password reset route
router.patch(
  "/reset-password",
  validateUserOnPasswordReset,
  async (req, res, next) => {
    console.log("reset for user: ", req.user);
    Users.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        password: await bcrypt.hash(req.body.new_password, 14),
      }
    )
      .exec()
      .then((user) => {
        res
          .status(200)
          .json({ message: "Parola dvs. a fost resetata cu succes." });
      });
  }
);

module.exports = router;
