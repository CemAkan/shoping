module.exports = (sequelize, Sequelize) => {
  return sequelize.define("oldOrder", {
    //total price of old order
    totalprice: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    //paying method of old order

    payingMethod: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    //star rate of old order

    starRate: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    //date of old order

    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  });
};
