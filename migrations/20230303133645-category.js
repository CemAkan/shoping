"use strict"; //category_Id

module.exports = {
  async up(queryInterface, Sequelize) {
    //new id create after that categoryId infos copied to id column

    await queryInterface.addColumn("categories", "id", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.sequelize.query(`
      UPDATE categories
      SET id = categoryId
    `);

    //create category_Id and after that categoryId infos copied to category_Id column

    await queryInterface.addColumn("items", "category_Id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE items
      SET category_Id = categoryId
    `);

    //old columns remove

    await queryInterface.removeColumn("items", "categoryId");
    await queryInterface.removeColumn("categories", "categoryId");

    //new colums' properties change
    await queryInterface.changeColumn("categories", "id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });

    await queryInterface.changeColumn("items", "category_Id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    //old categoryId removed and new one create after that id infos copied to categoryId column

    await queryInterface.addColumn("categories", "categoryId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.sequelize.query(`
      UPDATE categories
      SET categoryId = id
    `);

    //create categoryId and after that category_Id infos copied to categoryId column

    await queryInterface.addColumn("items", "categoryId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE items
      SET categoryId = category_Id
    `);

    //old columns remove
    await queryInterface.removeColumn("items", "categoryId");
    await queryInterface.removeColumn("categories", "id");

    //new colums' properties change
    await queryInterface.changeColumn("categories", "categoryId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });

    await queryInterface.changeColumn("items", "categoryId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "categoryId",
      },
    });
  },
};
