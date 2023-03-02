module.exports = (sequelize, Sequelize) => {
  return sequelize.define("category", {
    name: {
      type: Sequelize.STRING,
      allowNUll: false,
      validate: {
        len: [1, 20],
      },
    },
  });
};
