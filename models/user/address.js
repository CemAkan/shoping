module.exports = (sequelize, Sequelize) => {
  return sequelize.define("address", {
    //name of addres for describe it
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    //open address
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    //distance of address
    distanceCategory: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
};
