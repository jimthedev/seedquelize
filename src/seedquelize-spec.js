'use strict'

const seed = require('./index.js')

/* global describe, it */
describe('should create items', () => {
  it('when given one model and one data item', (done) => {
    // Mocking out a sequelize model's create function
    // Users should use an actual sequelize model
    const Artist = {
      create: function () {
        done()
      }
    }

    // This shows the shape of the structure we are expecting
    const artists = {
      data: [
        {
          name: 'Andrea Bocelli',
          genre: 'Opera'
        }
      ],
      model: Artist
    }

    // This shows how to call seedquelize
    seed([artists])
  })
  it('when given one model and multiple data items', function (done) {
    let currentDoneCount = 0
    let finalDoneCount = 2

    // Mocking out a sequelize model's create function
    // Users should use an actual sequelize model
    const Artist = {
      create: function () {
        checkIfDone()
      }
    }

    // This shows the shape of the structure we are expecting
    const artists = {
      data: [
        {
          name: 'Andrea Bocelli',
          genre: 'Opera'
        },
        {
          name: 'Britney Spears',
          genre: 'Pop'
        },
        {
          name: 'Lee Morgan',
          genre: 'Jazz'
        }
      ],
      model: Artist
    }

    // Only used in test to see if we've fired create enough times
    const checkIfDone = () => {
      if (currentDoneCount === finalDoneCount) {
        done()
      } else {
        currentDoneCount++
      }
    }

    // This shows how to call seedquelize
    seed([artists])
  })
  it('when given multiple models and multiple data items', function (done) {
    let currentDoneCount = 0
    let finalDoneCount = 4

    // Mocking out a sequelize model's create function
    // Users should use an actual sequelize model
    const Artist = {
      create: function () {
        checkIfDone()
      }
    }
    const User = {
      create: function () {
        checkIfDone()
      }
    }

    // This shows the shape of the structure we are expecting
    const artists = {
      data: [
        {
          name: 'Andrea Bocelli',
          genre: 'Opera'
        },
        {
          name: 'Britney Spears',
          genre: 'Pop'
        },
        {
          name: 'Lee Morgan',
          genre: 'Jazz'
        }
      ],
      model: Artist
    }

    const users = {
      data: [
        {
          username: 'jimthedev',
          twitter: '@jimthedev'
        },
        {
          username: 'jnessview',
          twitter: 'JNessView'
        }
      ],
      model: User
    }

    // Only used in test to see if we've fired create enough times
    const checkIfDone = () => {
      if (currentDoneCount === finalDoneCount) {
        done()
      } else {
        currentDoneCount++
      }
    }

    // This shows how to call seedquelize
    seed([
      artists,
      users
    ])
  })
})
