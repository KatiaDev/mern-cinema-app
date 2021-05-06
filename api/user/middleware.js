const { check, validationResult } = require("express-validator");
const Users = require("./model");

const validateNewUser = async (req, res, next) => {
  await check("firstname")
    .notEmpty()
    .withMessage("Firstname is required.")
    .isLength({ min: 3 })
    .withMessage("Firstname must have minimum length of 3.")
    .trim()
    .run(req);

  await check("lastname")
    .notEmpty()
    .withMessage("Lastname is required.")
    .isLength({ min: 3 })
    .withMessage("Lastname must have minimum length of 3.")
    .trim()
    .run(req);

  await check("age")
    .notEmpty()
    .withMessage("Age is required.")
    .isNumeric()
    .withMessage("Invalid format.")
    .run(req);

  await check("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile phone number is required.")
    .isMobilePhone()
    .withMessage("Mobile phone number is wrong.")
    .run(req);

  await check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 4, max: 10 })
    .withMessage("Username should have min and max length between 4-10")
    .trim()
    .run(req);

  await check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 15 })
    .withMessage("Your password should have min and max length between 8-15.")
    .matches(/\d/)
    .withMessage("Your password should have at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Your password should have at least one special character.")
    .trim()
    .run(req);

  await check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .normalizeEmail()
    .withMessage("The specified email does not match the rules.")
    .trim()
    .custom((email) => {
      return Users.find({
        email,
      })
        .then((user) => {
          if (user.length > 0) {
            return res.status(400).json("Email is already registered.");
          }
        })
        .catch(next);
    })
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  } else {
    next();
  }
};

const validateUserOnChange = async (req, res, next) => {
  await check("firstname")
    .notEmpty()
    .withMessage("Firstname is required.")
    .isLength({ min: 3 })
    .withMessage("Firstname must have minimum length of 3.")
    .trim()
    .run(req);

  await check("lastname")
    .notEmpty()
    .withMessage("Lastname is required.")
    .isLength({ min: 3 })
    .withMessage("Lastname must have minimum length of 3.")
    .trim()
    .run(req);

  await check("age")
    .notEmpty()
    .withMessage("Age is required.")
    .isNumeric()
    .withMessage("Invalid format.")
    .run(req);

  await check("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile phone number is required.")
    .isMobilePhone()
    .withMessage("Mobile phone number is wrong.")
    .run(req);

  await check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 4, max: 10 })
    .withMessage("Username should have min and max length between 4-10")
    .trim()
    .run(req);

  await check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .normalizeEmail()
    .withMessage("The specified email does not match the rules.")
    .run(req);

  await Users.find({
    email: req.body.email,
  })
    .exec()
    .then((users) => {
      if (users.length > 0 && req.body.email !== req.decoded.email) {
        return res.status(400).json("Email is already registered.");
      }
    })
    .catch(next);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  } else {
    next();
  }
};

const checkUserExists = async (req, res, next) => {
  Users.findOne({ _id: req.params.user_id, active: true })
    .then((user) => {
      if (!user) {
        return res.status(400).json(" User is not found.");
      }
      next();
    })
    .catch(next);
};

module.exports = {
  validateNewUser,
  validateUserOnChange,
  checkUserExists,
};
