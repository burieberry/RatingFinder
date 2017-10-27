const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, '..', 'public'));

app.get('/', (req, res, next) => res.render('index'));

app.use((req, res, next, err) => {
  console.log(err.message);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
