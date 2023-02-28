const model = require("../services/modelService");
var { userModel } = require("../database/database");

module.exports = (email) => {
  model
    .findOne(userModel, {
      where: {
        email: email,
      },
    })
    .then((person) => {
      if (person != null) {
        return true;
        //--> username length check and return info to user about it <--
      } else {
        return false;
      }
    });
};
