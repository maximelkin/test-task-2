'use strict'

const db = require('./db')
const Umzug = require('umzug')

const { Op } = db.Sequelize

async function createBook (book) {
  return db.book.create(book)
}

async function createAuthor (author) {
  return db.author.create(author)
}

async function selectTop (limit) {
  return db.author.findAll({
    attributes: {
    },
    include: [{
      model: db.book,
      where: {
        pages: {
          [Op.gt]: 200,
        },
      },
    }],
    order: db.sequelize.literal('count(*) DESC'),
    group: ['book.id'],
    limit,
  })
}

async function connect () {
  await db.sequelize.authenticate() // check all ok
  const umzug = new Umzug({ sequelize: db.sequelize })

  await umzug.up() // migrations

  return {
    createBook,
    createAuthor,
    selectTop,
  }
}

module.exports = {
  connect,
}
