const Users = require("../user/model");
const Notifications = require("../notification/model");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { notificationSendEmail } = require("../../services/email/message");

const registeredAccess = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, please SignIn !!!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token invalid, please SignIn !!!" });
    }
    req.decoded = decoded;
    next();
  });
};
//----------------------------------------------------------------------------------------------//

const staffAccess = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, please SignIn !!!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token invalid, please SignIn !!!" });
    }
    req.decoded = decoded;
    const { role } = req.decoded;
    if (!role || role === 0) {
      return res.status(403).json("No privileges for resource access.");
    } else {
      next();
    }
  });
};

//----------------------------------------------------------------------------------------------//

const checkUserRegister = async (req, res, next) => {
  await check("password")
    .trim()
    .isLength({ min: 8, max: 15 })
    .withMessage("Your password should have min and max length between 8-15.")
    .matches(/\d/)
    .withMessage("Your password should have at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Your password should have at least one special character")

    .run(req);

  await check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .normalizeEmail()
    .withMessage("The specified email does not match the rules.")
    .run(req);

  await Users.findOne({
    email: req.body.email,
    status: "Active",
  })
    .exec()
    .then((user) => {
      if (user) {
        req.user = user;
      } else if (user && user.status === "Pending") {
        return res
          .status(401)
          .json({ message: "Pending Account.Please verify your email!" });
      } else {
        return res
          .status(404)
          .json("You do not have a profile. Please Register.");
      }
    });

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  } else {
    next();
  }
};

//----------------------------------------------------------------------------------------------//

const validateUserIdentity = async (req, res, next) => {
  console.log("Decoded", req.decoded);
  console.log("Params", req.params.user_id);
  if (req.decoded._id !== req.params.user_id && req.decoded.role === 0) {
    return res.status(403).json("Forbidden.");
  }
  next();
};

////// acest middleware "сheckConfirmationRegister" se executa atunci cand user-ul apasa pe butonul "Activeaza contul" din email,
///// daca contul a fost activat deja, se arunca eroarea din else, daca nu => next()

const сheckConfirmationRegister = async (req, res, next) => {
  await Users.findOne({ _id: req.params.user_id, status: "Active" })
    .exec()
    .then((user) => {
      if (!user) {
        next();
      } else {
        return res
          .status(500)
          .json(
            "Account is already activated thanks for choosing Olymp Cinema"
          );
      }
    });
};

// acest middleware "validateUserOnPasswordReset" cauta user-ul in baza de date, conform email-ului furnizat.
// daca il gaseste => trimite mesaj cu linkul de resetare a parolei, daca nu => message: "You don`t have account"

const validateUserOnPasswordReset = async (req, res, next) => {
  await Users.findOne({ email: req.body.email, status: "Active" })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "You don't have acount." });
      } else {
        req.user = user;
        new Notifications({
          title: "Resetarea Parolei",
          content: "Apasati pe link-ul de mai jos pentru a reseta parola.",
          notification_type: "Reset",
        })
          .save()
          .then((newNotification) => {
            notificationSendEmail(
              req.user.email,
              newNotification.title,
              newNotification.content
            );
          });

        next();
      }
    });
};

module.exports = {
  registeredAccess,
  checkUserRegister,
  staffAccess,
  validateUserIdentity,
  сheckConfirmationRegister,
  validateUserOnPasswordReset,
};
