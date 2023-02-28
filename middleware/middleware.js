const database = require("../database/database");

module.exports = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (token != null) {
    database.userModel
      .findOne({
        where: {
          access_token: token,
        },
      })
      .then((result) => {
        if (result != null) {
          req.body.userData = result.toJSON();
          next();
        } else {
          return res.status(401).send({
            message: "UnAuthenticated1",
          });
        }
      });
  } else {
    return res.status(401).send({
      message: "UnAuthenticated2",
    });
  }
};
