module.exports = (sequelize, Sequelize) => {
  return sequelize.define("deliveryDetail", {
    //distance category for addresses
    distanceCategory: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    //delivery time for distance of addresses
    deliveryTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    //minimum delivery amount for distance of addresses

    minimumDeliveryAmount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    //delivery cost for distance of addresses

    deliveryCost: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });
};
