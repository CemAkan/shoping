"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    //new phone create after that id infos copied to phone column

    await queryInterface.addColumn("users", "phone", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.sequelize.query(`
      UPDATE users
      SET phone = id
    `);

    //create phone and after that userId infos copied to phone column

    await queryInterface.addColumn("likes", "phone", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE likes
      SET phone = userId
    `);

    //create phone and after that userId infos copied to phone column

    await queryInterface.addColumn("carts", "phone", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE carts
      SET phone = userId
    `);

    //old columns remove

    await queryInterface.removeColumn("likes", "userId");
    await queryInterface.removeColumn("carts", "userId");
    await queryInterface.removeColumn("users", "id");

    //new colums' properties change
    await queryInterface.changeColumn("users", "phone", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
    await queryInterface.changeColumn("carts", "phone", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "phone",
      },
    });
    await queryInterface.changeColumn("likes", "phone", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "phone",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    //userId create after that phone infos copied to id column

    await queryInterface.addColumn("users", "userId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.sequelize.query(`
      UPDATE users
      SET id = phone
    `);

    //create userId and after that phone infos copied to userId column

    await queryInterface.addColumn("likes", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE likes
      SET userId = phone
    `);

    //create userId and after that phone infos copied to userId column

    await queryInterface.addColumn("carts", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE carts
      SET userId = phone
    `);

    //old columns remove

    await queryInterface.removeColumn("likes", "phone");
    await queryInterface.removeColumn("carts", "phone");
    await queryInterface.removeColumn("users", "phone");

    //new colums' properties change
    await queryInterface.changeColumn("users", "userId", {
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
        key: "phone",
      },
    });
    await queryInterface.changeColumn("likes", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "phone",
      },
    });
  },
};
