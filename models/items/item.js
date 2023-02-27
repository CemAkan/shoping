module.exports = (sequelize, Sequelize) => {
  return sequelize.define("item", {
    itemId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      readOnly: true,
      autoIncrement: true,
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
    price: {
      type: Sequelize.FLOAT,
      allowNUll: false,
    },
    //foreign key
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
  });
};
