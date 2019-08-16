'use strict'

module.exports = {
  up: (queryInterface) => {
    return queryInterface.addConstraint('Books', ['author_id'], {
      type: 'foreign key',
      name: 'FK_books_author',
      references: {
        table: 'Authors',
        field: 'id',
      },
      onDelete: 'restrict',
    })
  },

  down: (queryInterface) => {
    return queryInterface.removeConstraint('Books', 'FK_books_author')
  },
}
