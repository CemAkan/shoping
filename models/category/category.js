module.exports = (sequelize, Sequelize) => {
  return sequelize.define("category", {
    categoryId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      readOnly: true,
      allowNUll: false,
      unique: true,
      autoIncrement: true,
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
