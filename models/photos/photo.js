module.exports = (sequelize, Sequelize) => {
  const photoMedia = sequelize.define(
    "photo",
    {
      photoLink: {
        type: Sequelize.STRING,
      },

      photoType: {
        type: Sequelize.STRING,
      },

      photoSize: {
        type: Sequelize.DOUBLE,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return photoMedia;
};
