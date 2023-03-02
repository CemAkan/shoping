module.exports = (sequelize, Sequelize) => {
  return sequelize.define("cart", {
    activity_status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNUll: false,
    },
  });
};
