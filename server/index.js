const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

let config = process.env;
try {
  config = require('../config.json');
}
catch(ex) {}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, '..', 'public'));


// TO DO: make it so that it works when token is refreshed
// Get Yelp access token:
const yelp = require('yelp-fusion');
// const token = yelp.accessToken(config.YELP_CLIENT_ID, config.YELP_CLIENT_SECRET)
//   .then(response => console.log(response.jsonBody.access_token))
//   .catch(err => console.log(err))

// from token stored in secret file
const client = yelp.client(config.TOKEN);

const configData = {
  GOOGLE_API_KEY: config.GOOGLE_API_KEY,
  FS_CLIENT_ID: config.FS_CLIENT_ID,
  FS_CLIENT_SECRET: config.FS_CLIENT_SECRET
};

app.get('/', (req, res, next) => res.render('index', configData));

app.post('/api/yelp', (req, res, next) => {
  const { latitude, longitude, term } = req.body;
  client.search({ latitude, longitude, term })
    .then(response => {
      // console.log(response.jsonBody.businesses[0]);
      res.send(response.jsonBody.businesses[0]);
    })
    .catch(next)
});

app.post('/api/yelp/reviews', (req, res, next) => {
  client.reviews(req.body.id).then(response => {
    res.send(response.jsonBody.reviews);
  }).catch(next);
});

app.use((req, res, next, err) => {
  console.log(err.message);
  // res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
