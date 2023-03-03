"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    //new id create after that customerId infos copied to id column

    await queryInterface.addColumn("users", "id", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.sequelize.query(`
      UPDATE users
      SET id = customerId
    `);

    //create userId and after that customerId infos copied to userId column

    await queryInterface.addColumn("likes", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE likes
      SET userId = customerId
    `);

    //create userId and after that customerId infos copied to userId column

    await queryInterface.addColumn("carts", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE carts
      SET userId = customerId
    `);

    //old columns remove

    await queryInterface.removeColumn("likes", "customerId");
    await queryInterface.removeColumn("carts", "customerId");
    await queryInterface.removeColumn("users", "customerId");

    //new colums' properties change
    await queryInterface.changeColumn("users", "id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
    await queryInterface.changeColumn("carts", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    });
    await queryInterface.changeColumn("likes", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    //customerId create after that id infos copied to customerId column

    await queryInterface.addColumn("users", "customerId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.sequelize.query(`
      UPDATE users
      SET customerId = id
    `);

    //create customerId and after that userId infos copied to customerId column

    await queryInterface.addColumn("likes", "customerId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE likes
      SET customerId = userId
    `);

    //create customerId and after that userId infos copied to customerId column

    await queryInterface.addColumn("carts", "customerId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE carts
      SET customerId = userId
    `);

    //old columns remove

    await queryInterface.removeColumn("likes", "userId");
    await queryInterface.removeColumn("carts", "userId");
    await queryInterface.removeColumn("users", "id");

    //new colums' properties change
    await queryInterface.changeColumn("users", "customerId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
    await queryInterface.changeColumn("carts", "customerId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    });
    await queryInterface.changeColumn("likes", "customerId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    });
  },
};
