'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up the express app
var app = (0, _express2.default)();

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use('/api/v1', _index2.default);

// welcome route
app.get('/', function (req, res) {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Politico!'
  });
});

// Default catch-all route that sends back an error message for wrong routes
app.all('/*', function (req, res) {
  res.status(404).json({
    status: 404,
    message: 'The page you were looking for was not found!'
  });
});

var port = process.env.PORT || 8000;

app.listen(port);

exports.default = app;