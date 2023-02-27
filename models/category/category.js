module.exports = (sequelize, Sequelize) => {
  return sequelize.define("category", {
    categoryId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      readOnly: true,
      allowNUll: false,
      unique: true,
      validate: {
        len: [1, 10],
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNUll: false,
      validate: {
        len: [1, 20],
      },
    },
  });
};
