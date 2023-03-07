module.exports = (sequelize, Sequelize) => {
  return sequelize.define("card", {
    //credit card number
    cardNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    //credit card name
    cardName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};
