module.exports = (sequelize, Sequelize) => {
  return sequelize.define("like", {
    itemIds: {
      type: Sequelize.INTEGER,
      allowNUll: true,
    },
    //foreign key
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "customerId",
      },
    },
  });
};
