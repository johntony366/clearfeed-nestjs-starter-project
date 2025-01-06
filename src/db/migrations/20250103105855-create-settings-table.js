'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'settings',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          data_type: {
            type: Sequelize.ENUM('string', 'number', 'boolean', 'json'),
            allowNull: false,
          },
          account_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'accounts',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          value: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
            allowNull: false,
          },
          deleted_at: {
            type: Sequelize.DATE,
            allowNull: true,
          },
        },
        { transaction },
      );
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('settings', { transaction });
    });
  },
};
