module.exports = (sequelize, Sequelize) => {
  return sequelize.define("category", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      readOnly: true,
      allowNUll: false,
      unique: true,
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
