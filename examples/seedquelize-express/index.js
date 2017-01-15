let seed;

if(process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config() // environment variables, used for hiding secrets
  seed = require('seedquelize')
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
});

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    field: 'username'
  },
  twitter: {
    type: Sequelize.STRING,
    field: 'twitter'
  }
});

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
