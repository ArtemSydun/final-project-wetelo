import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING,
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('Users', 'phone');
  },
};
