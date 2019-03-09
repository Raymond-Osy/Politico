'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

require('dotenv/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  hashPassword: function hashPassword(password) {
    return _bcryptjs2.default.hashSync(password, _bcryptjs2.default.genSaltSync(8));
  },
  comparePassword: function comparePassword(password, hashPassword) {
    return _bcryptjs2.default.compareSync(password, hashPassword);
  },
  generateToken: function generateToken(user) {
    var token = _jsonwebtoken2.default.sign({ user: user }, process.env.JWTKEY, { expiresIn: '24h' });
    return token;
  },
  isAuthenticated: function isAuthenticated(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      res.status(403).json({
        status: 403,
        error: 'Missing x-access-token in the request header'
      });
    } else {
      _jsonwebtoken2.default.verify(token, process.env.JWTKEY, function (err, decoded) {
        if (err) {
          return res.status(403).json({
            status: 403,
            message: 'Invalid token supplied'
          });
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
        status: 404,
        message: 'Missing x-access-token in the request header'
      });
    } else {
      _jsonwebtoken2.default.verify(token, process.env.JWTKEY, function (err, decoded) {
        if (err) {
          return res.status(403).json({
            status: 403,
            error: 'Invalid token supplied'
          });
        }
        if (decoded.user.isadmin !== true) {
          return res.status(403).json({
            status: 403,
            error: 'Unauthorised User'
          });
        }
        req.user = decoded.user;
        next();
      });
    }
  }
};