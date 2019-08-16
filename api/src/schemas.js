const authorCreate = {
  type: 'object',
  required: ['name', 'age'],
  properties: {
    name: { type: 'string' },
    age: { type: 'integer', exclusiveMinimum: 0 },
  },
}

const authorRead = {
  type: 'object',
  required: authorCreate.required.concat('id'),
  properties: {
    ...authorCreate.properties,
    id: { type: 'integer' },
  },
}

const bookCreate = {
  type: 'object',
  required: ['authorId', 'title', 'pages'],
  properties: {
    authorId: { type: 'integer' },
    title: { type: 'string' },
    pages: { type: 'integer', exclusiveMinimum: 0 },
  },
}

module.exports = { authorCreate, authorRead, bookCreate }
