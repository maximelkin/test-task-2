'use strict'

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'author_id',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { timestamps: false })

  Book.associate = function (models) {
    models.Author.hasMany(Book, { foreignKey: 'author_id', sourceKey: 'id' })
  }
  return Book
}
