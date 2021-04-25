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

  await check("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one sepcial character")
    .trim()
    .run(req);

  await check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("the specified mail does not match the rules")
    .trim()
    .custom((email) => {
      return Users.find({
        email,
      }).then((user) => {
        if (user.length > 0) {
          throw "Email is already registered";
        }
      });
    })
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  } else {
    next();
  }
};



module.exports = {
  validateNewUser,
};
