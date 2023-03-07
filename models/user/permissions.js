module.exports = (sequelize, Sequelize) => {
  return sequelize.define("permission", {
    SMS: {
      type: Sequelize.BOOLEAN,
    },
    email: {
      type: Sequelize.BOOLEAN,
    },
  });
};
