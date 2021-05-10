const Users = require("../user/model");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const registeredAcces = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, please SingIn !!!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token invalid, please SingIn !!!" });
    }
    req.decoded = decoded;
    next();
  });
};
/////////////////////////////////////////////////////////////////////////////////////////

const staffAcces = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, please SingIn !!!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token invalid, please SingIn !!!" });
    }
    req.decoded = decoded;
    const { role } = req.decoded;
    if (!role || role === 0) {
      return res.status(403).json("No privileges for resource access");
    } else {
      next();
    }
  });
};

////////////////////////////////////////////////////////////////////////////////////////////

const checkUserRegister = async (req, res, next) => {
  await check("password")
    .trim()
    .isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one sepcial character")

    .run(req);

  await check("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("the specified mail does not match the rules")
    .run(req);

  await Users.findOne({
    email: req.body.email,
    status: "Active",
  })
    .exec()
    .then((user) => {
      if (user) {
        req.user = user;
      } else {
        return res
          .status(404)
          .json("You do not have a profile please register");
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

module.exports = {
  registeredAcces,
  checkUserRegister,
  staffAcces,
  validateUserIdentity,
  сheckConfirmationRegister,
};
