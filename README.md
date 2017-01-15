# seedquelize

> Seed your database with [Sequelize](sequelizejs.com).
>
> Add initial data to your database so that you don't need to create dummy data each time you boot up your app in development.  
>
> You can also use this when running end-to-end tests since you'll need consistent data to test against.

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## Getting Started

### Background

Typically you want to seed your database before your express or other app begins.  This means it needs to sit in between the spot where you define your sequelize models and where you serve your app.  

**NOTE: You also will want to make sure that you don't run this in production since it will remove all the data. :)**

### Installation

```
npm install seedquelize --save-dev
```

### Usage

This example uses the following npm modules which you will have to install on your own:  `dotenv-safe`, `express`, `body-parser`, `sequelize` and `seedquelize` to start up an express app with seed data when not in production. Your database config info should be in a .env file. I've commented this file as much as possible to show how to use seeding in an actual app. Pull requests are welcome in order to make this more clear.

```js
if(process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config() // environment variables, used for hiding secrets
  const seed = require('seedquelize')
}

const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

// Connect to a sql database
const sequelize = new Sequelize(process.env.DATABASE_URL)

const Artist = sequelize.define('artist', {
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  genre: {
    type: Sequelize.STRING,
    field: 'genre'
  }
}

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    field: 'username'
  },
  twitter: {
    type: Sequelize.STRING,
    field: 'twitter'
  }
}

// This line saves your job by not deleting production data
if(process.env.NODE_ENV !== 'production') {
  
  // Clear out the existing database
  sequelize.sync({force: true}).then(() => {
    
    // This shows the shape of the structure we are expecting.
    // data is just an array of whatever models you want to create,
    // model is of course the actual model you want created
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

    // Actually seed the database using seedquelize
    seed([
      artists,
      users
    ]).then(() =>{
      // Only started after seeding in dev/test
      startExpress();
    })
  })
} else {
  // Started right away in prod
  startExpress();
}

function startExpress() {
  // Create a new express app to server our api
  var app = express()

  // Teach express how to parse requests of type application/json
  //
  app.use(bodyParser.json());

  // Teach express how to parse requests of type application/x-www-form-urlencoded
  //
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.get('/api/artists', (req, res) => {
    Artist.findAll().then((artists) => {
      res.json(artists);
    })
  })
  app.get('/api/users', (req, res) => {
    User.findAll().then((users) => {
      res.json(users);
    })
  })
  // Determine which port to listen on
  const port = process.env.PORT ? process.env.PORT : 3001

  // Actually start the server
  app.listen(port, () => {
    console.log('Example app listening on port ' + port + '!')
  })
}


```

### Small print

Author: Jim Cummins &lt;jimthedev@gmail.com&gt; &copy; 2017



License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/jimthedev/seedquelize/issues) on Github

## MIT License

Copyright (c) 2017 Jim Cummins &lt;jimthedev@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/seedquelize.svg?downloads=true
[npm-url]: https://npmjs.org/package/seedquelize
[ci-image]: https://travis-ci.org/jimthedev/seedquelize.svg?branch=master
[ci-url]: https://travis-ci.org/jimthedev/seedquelize
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
