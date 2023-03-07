module.exports = (sequelize, Sequelize) => {
  return sequelize.define("permission", {
    SMS: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
};
