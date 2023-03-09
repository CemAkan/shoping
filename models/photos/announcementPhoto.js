module.exports = (sequelize, Sequelize) => {
  const photoMedia = sequelize.define(
    "announcementPhoto",
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

      isStored: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return photoMedia;
};
