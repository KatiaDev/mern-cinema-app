const { check, validationResult } = require("express-validator");
const Users = require("./model");

const validateNewUser = async (req, res, next) => {
  await check("firstname")
    .isLength({ min: 3 })
    .withMessage("the firstname must have minimum length of 3")
    .trim()
    .run(req);

  await check("lastname")
    .isLength({ min: 3 })
    .withMessage("the lastname must have minimum length of 3")
    .trim()
    .run(req);

  await check("age")
    .notEmpty()
    .withMessage("then age is required")
    .isNumeric()
    .withMessage("invalid format")
    .run(req);

  await check("mobile")
    .trim()
    .notEmpty()
    .withMessage("the mobile number is required")
    .isMobilePhone()
    .withMessage("mobile phone number is wrong")
    .run(req);

  await check("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one special character")
    .trim()
    .run(req);

  await check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("the specified email does not match the rules")
    .trim()
    .custom((email) => {
      return Users.find({
        email,
      })
        .then((user) => {
          if (user.length > 0) {
            return res.status(400).json("Email is already registered");
          }
        })
        .catch(next);
    })
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  }
  next();
};

const checkUserExists = async (req, res, next) => {
  Users.findOne({ _id: req.params.user_id, active: true })
    .then((user) => {
      if (!user) {
        return res.status(400).json(" User is not found ");
      }
      next();
    })
    .catch(next);
};

module.exports = {
  validateNewUser,
  checkUserExists,
};
