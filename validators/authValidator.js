const validator = require("./validate");

module.exports = {
  // validation for creating a new user
  signUp: (req, res, next) => {
    const validationRule = {
      username: "required|string",
      email: "required|email",
      password: "required|string|min:8",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "error", data: error });
      } else {
        next();
      }
    });
  },
  // validation for updating a new user
  updateUser: (req, res, next) => {
    const validationRule = {
      username: "string",
      email: "email",
      password: "string|min:8",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "error", data: error });
      } else {
        next();
      }
    });
  },
};
