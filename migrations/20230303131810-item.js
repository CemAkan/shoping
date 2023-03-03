"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    //id create after that itemId infos copied to id column

    await queryInterface.addColumn("items", "id", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.sequelize.query(`
      UPDATE items
      SET id = itemId
    `);

    //create itemId and after that itemIds infos copied to itemId column

    await queryInterface.addColumn("likes", "itemId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE likes
      SET itemId = itemIds
    `);

    //create itemId and after that itemIds infos copied to itemId column

    await queryInterface.addColumn("carts", "itemId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE carts
      SET itemId = itemIds
    `);

    //old columns remove

    await queryInterface.removeColumn("likes", "itemIds");
    await queryInterface.removeColumn("carts", "itemIds");
    await queryInterface.removeColumn("items", "itemId");

    //new colums' properties change
    await queryInterface.changeColumn("items", "id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
    await queryInterface.changeColumn("carts", "itemId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "items",
        key: "id",
      },
    });
    await queryInterface.changeColumn("likes", "itemId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "items",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    //itemId create after that id infos copied to itemId column

    await queryInterface.addColumn("items", "itemId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.sequelize.query(`
      UPDATE items
      SET itemId = id
    `);

    //create itemIds and after that itemId infos copied to itemIds column

    await queryInterface.addColumn("likes", "itemIds", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE likes
      SET itemIds = itemId
    `);

    //create itemIds and after that itemId infos copied to itemIds column

    await queryInterface.addColumn("carts", "itemIds", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE carts
      SET itemIds = itemId
    `);

    //old columns remove

    await queryInterface.removeColumn("likes", "itemId");
    await queryInterface.removeColumn("carts", "itemId");
    await queryInterface.removeColumn("items", "id");

    //new colums' properties change
    await queryInterface.changeColumn("items", "itemId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
    await queryInterface.changeColumn("carts", "itemIds", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "items",
        key: "id",
      },
    });
    await queryInterface.changeColumn("likes", "itemIds", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "items",
        key: "id",
      },
    });
  },
};
