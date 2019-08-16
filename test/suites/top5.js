'use strict'

const { assert } = require('chai')
const { it, describe } = require('mocha')
const { request } = require('../lib/request')
const { promisify } = require('util')

const delay = promisify(setTimeout)

describe('Books', () => {
  it('Does return initial top5 = []', async () => {
    await delay(1200)

    const top = await request.get('/top5')
    assert.deepEqual(top, [])
  })

  it('Does update top5', async () => {

    const response = await request.post('/author', {
      body: {
        name: 'a',
        age: 17,
      },
    })
    await request.post('/book', {
      body: {
        title: 'A book',
        pages: 232,
        authorId: response.id,
      },
    })
    await delay(1200)
    const top = await request.get('/top5')

    assert.deepEqual(top, [{
      name: 'a',
      age: 17,
      id: response.id,
    }])
  })
  // TODO testcase invalid, ask for expected behaviour
  it.skip('Does give ordered top5', async () => {

    const { id: authorId1 } = await request.post('/author', {
      body: {
        name: 'a',
        age: 17,
      },
    })

    const { id: authorId2 } = await request.post('/author', {
      body: {
        name: 'b',
        age: 17,
      },
    })
    await request.post('/book', {
      body: {
        title: 'A book',
        pages: 232,
        authorId: authorId1,
      },
    })
    await delay(1200)
    const top = await request.get('/top5')

    assert.deepEqual(top, [{
      name: 'a',
      age: 17,
      id: authorId1,
    }, {
      name: 'b',
      age: 17,
      id: authorId2,
    }])
  })
})
