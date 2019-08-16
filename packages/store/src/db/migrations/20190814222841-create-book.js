'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'author_id',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Books')
  },
}
