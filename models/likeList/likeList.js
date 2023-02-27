module.exports = (sequelize, Sequelize) => {
  return sequelize.define("like", {
    itemIds: {
      type: Sequelize.INTEGER,
      allowNUll: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "customerId",
      },
    },
  });
};
