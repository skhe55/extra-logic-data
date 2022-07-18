'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('type_fields', [{
      type_field: 'select',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type_field: 'textarea',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type_field: 'input',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('type_fields', null, {});
  }
};