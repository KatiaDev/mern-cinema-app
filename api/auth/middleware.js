const Users = require("../user/model");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const registeredAccess = async (req, res, next) => {
  const token = req.cookies.token;

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
/////////////////////////////////////////////////////////////////////////////////////////

const staffAccess = async (req, res, next) => {
  const token = req.cookies.token;

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

////////////////////////////////////////////////////////////////////////////////////////////

const checkUserRegister = async (req, res, next) => {
  await check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 15 })
    .withMessage("Your password should have min and max length between 8-15.")
    .matches(/\d/)
    .withMessage("Your password should have at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Your password should have at least one sepcial character.")
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
    active: true,
  })
    .exec()
    .then((user) => {
      if (user) {
        console.log("Este", user);
        req.user = user;
      } else {
        return res
          .status(404)
          .json("You do not have a profile. Please Register.");
      }
    });

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};

///////////////////////////////////////////////////////////////////////////////////////////

const validateUserIdentity = async (req, res, next) => {
  console.log("Decoded", req.decoded);
  console.log("Params", req.params.user_id);
  if (req.decoded._id !== req.params.user_id && req.decoded.role === 0) {
    return res.status(403).json("Forbidden.");
  }
  next();
};

module.exports = {
  registeredAccess,
  checkUserRegister,
  staffAccess,
  validateUserIdentity,
};
