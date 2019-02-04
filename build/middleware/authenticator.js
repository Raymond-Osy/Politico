'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

require('dotenv/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  generateToken: function generateToken(user) {
    var token = _jsonwebtoken2.default.sign({ user: user }, process.env.JWTKEY, { expiresIn: '24h' });
    return token;
  },
  isAuthenticated: function isAuthenticated(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      res.status(403).json({
        success: false,
        message: 'Missing Token'
      });
    } else {
      _jsonwebtoken2.default.verify(token, process.env.JWTKEY, function (err, decoded) {
        if (err) {
          return res.status(403).json({ message: 'Invalid token supplied' });
        }
        req.user = decoded.user;
        next();
      });
    }
  },
  isAuthorised: function isAuthorised(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      res.status(403).json({
        success: false,
        message: 'Missing Token'
      });
    } else {
      _jsonwebtoken2.default.verify(token, process.env.JWTKEY, function (err, decoded) {
        if (err) {
          return res.status(403).json({ message: 'Invalid token supplied' });
        }
        if (decoded.user.isAdmin !== 'true') {
          return res.status(403).json({ message: 'UnAuthorised User' });
        }
        req.user = decoded.user;
        next();
      });
    }
  }
};