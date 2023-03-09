module.exports = (sequelize, Sequelize) => {
  const photoCategories = sequelize.define(
    "photoCategories",
    {
      title: {
        type: Sequelize.STRING,
      },

      isStored: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return photoCategories;
};
