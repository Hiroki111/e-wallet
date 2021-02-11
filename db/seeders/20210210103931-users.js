'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'Bruno Doe',
          email: 'bruno@doe.com',
          password: '123456789',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Emre Smith',
          email: 'emre@smith.com',
          password: '123456789',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'John Stone',
          email: 'john@stone.com',
          password: '123456789',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
