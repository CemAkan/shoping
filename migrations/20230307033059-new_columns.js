module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "gender", {
      type: Sequelize.ENUM("M", "F", "Other"),
      allowNull: false,
      defaultValue: "Other",
    });
    await queryInterface.addColumn("items", "description", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "gender");
    await queryInterface.removeColumn("items", "description");
  },
};
