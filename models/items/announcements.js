module.exports = (sequelize, Sequelize) => {
  return sequelize.define("announcements", {
    details: {
      type: Sequelize.STRING,
    },
  });
};
