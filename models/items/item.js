module.exports = (sequelize, Sequelize) => {
  return sequelize.define("item", {
    //primary key
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
    //name of item
    name: {
      type: Sequelize.STRING,
      allowNUll: false,
      validate: {
        len: [1, 20],
      },
    },
    //price of item
    price: {
      type: Sequelize.FLOAT,
      allowNUll: false,
    },
    //foreign key (category)
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "categoryId",
      },
    },
  });
};
