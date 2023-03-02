module.exports = (sequelize, Sequelize) => {
  return sequelize.define("like", {
    activity_status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNUll: false,
    },
  });
};
