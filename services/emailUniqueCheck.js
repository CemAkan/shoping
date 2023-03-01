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
      } else {
        return false;
      }
    });
};
