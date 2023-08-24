const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const { handleError } = require('./controllers/errors');

require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json({limit: '1mb'}));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));


app.use('/api/users', require('./routes/api/users'));
app.use('/api/scrolls', require('./routes/api/scrolls'));
app.use('/api/decks', require('./routes/api/decks'));
app.use('/api/cards', require('./routes/api/cards'));

app.use(handleError);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});