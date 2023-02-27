module.exports = (sequelize, Sequelize) => {
  return sequelize.define("cart", {
    itemIds: {
      type: Sequelize.INTEGER,
      allowNUll: true,
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  });
};
