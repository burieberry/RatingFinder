const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

let config = process.env;
try {
  config = require('../config.json');
}
catch(ex) {

}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, '..', 'public'));


// Get Yelp access token:
const yelp = require('yelp-fusion');
// const token = yelp.accessToken(config.YELP_CLIENT_ID, config.YELP_CLIENT_SECRET)
//   .then(response => console.log(response.jsonBody.access_token))
//   .catch(err => console.log(err))

// from token stored in secret file
const client = yelp.client(config.TOKEN);

// client.search({
//   term: 'Four Barrel Coffee',
//   location: 'san francisco, ca'
// }).then(response => {
//   console.log(response.jsonBody);
//   console.log(response.jsonBody.businesses[0].name);
// }).catch(e => {
//   console.log(e);
// });

const data = {
  GOOGLE_API_KEY: config.GOOGLE_API_KEY,
  TOKEN: config.TOKEN
}

app.post('/api', (req, res, next) => {
  console.log('body: ', req.body)
  client.search({ term: req.body.term, location: req.body.location })
    .then(response => console.log(response.jsonBody.businesses[0]))
    .then(response => res.send(response))
    .catch(next)
});

// client.search({
//   term: 'Four Barrel Coffee',
//   location: 'san francisco, ca'
// }).then(response => {
//   console.log(response.jsonBody);
//   console.log(response.jsonBody.businesses[0].name);
// }).catch(e => {
//   console.log(e);
// });


app.get('/', (req, res, next) => res.render('index', data));

app.use((req, res, next, err) => {
  console.log(err.message);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});




// {
//     grant_type: 'client_credentials',
//     client_id: config.YELP_CLIENT_ID,
//     client_secret: config.YELP_CLIENT_SECRET
//   }

// get Yelp access token
// const yelpConfig = `?grant_type=client_credentials&client_id=${ config.YELP_CLIENT_ID }&client_secret=${ config.YELP_CLIENT_SECRET }`;

// app.post(`https://api.yelp.com/oauth2/token${ yelpConfig }`, (req, res, next) => {
//   console.log('response ', res)
// })
// .catch(err => console.log('err getting token: ', err));


/*
// const passport = require('passport');
// const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
// using passport:
passport.use('/yelp', new OAuth2Strategy({
    authorizationURL: 'https://api.yelp.com/oauth2/authorize',
    tokenURL: 'https://api.yelp.com/oauth2/token',
    clientID: config.YELP_CLIENT_ID,
    clientSecret: config.YELP_CLIENT_SECRET
  },

  function(accessToken, refreshToken, profile, cb) {
    console.log('token: ', accessToken, refreshToken)
  }

  ));

app.get('/auth/yelp', passport.authenticate('oauth2'));
*/



/*
// using simple-oauth2

// Set the configuration settings
const credentials = {
  client: {
    id: 'null',
    secret: 'null',
    idParamName: config.YELP_CLIENT_ID,
    secretParamName: config.YELP_CLIENT_SECRET
  },
  auth: {
    tokenHost: 'https://api.yelp.com/oauth2/token',
    // tokenPath: 'https://api.yelp.com/oauth2/token'
  }
};

// Initialize the OAuth2 Library
const oauth2 = require('simple-oauth2').create(credentials);

const tokenConfig = {};

// Get the access token object for the client
oauth2.clientCredentials
  .getToken(tokenConfig)
  .then((result) => {
    const token = oauth2.accessToken.create(result);
  })
  .catch((error) => console.log('Access token error:', error.message));
*/
