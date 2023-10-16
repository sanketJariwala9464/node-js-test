'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.STRING(100),
        allowNull: true,
        required: true,
      },
      order_tag: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      symbol: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      request_quantity: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      filled_quantity: {
        type: Sequelize.STRING(100),
        trim: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        enum: ["open", "complete","error","cancel"],
        defaultValue: 'open'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};
