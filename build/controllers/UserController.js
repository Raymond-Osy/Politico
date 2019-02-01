'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authenticator = require('../middleware/authenticator');

var _authenticator2 = _interopRequireDefault(_authenticator);

var _queries = require('../model/queries');

var _queries2 = _interopRequireDefault(_queries);

var _index = require('../model/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @class UserController
  * @description Authenticates and gives access to users
  */
var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'signUp',

    /**
      * @static
      * @param {object} req - The request payload recieved from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - A verified user
      * @memberOf UserController
      */
    value: function signUp(req, res) {
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          othernames = _req$body.othernames,
          email = _req$body.email,
          phoneNumber = _req$body.phoneNumber,
          passportUrl = _req$body.passportUrl,
          password = _req$body.password;


      _index2.default.query(_queries2.default.insertIntoUsers, [firstname, lastname, othernames, email, phoneNumber, passportUrl, password], function (err, dbRes) {
        if (err) {
          if (err.code === '23505') {
            return res.json({ status: 409, error: 'Email Address already exist in our database' });
          }
          return res.json({ status: 500, error: 'Could not register at the moment. Try again later.' });
        }
        var user = dbRes.rows[0];
        var id = user.id;

        var token = _authenticator2.default.generateToken({ email: email, id: id });
        return res.json({ status: 201, data: [{ token: token, user: user }] });
      });
    }

    /**
      * @static
      * @param {object} req - The request payload recieved from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - A verified user
      * @memberOf UserController
      */

  }, {
    key: 'login',
    value: function login(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;


      _index2.default.query(_queries2.default.queryUsers, [email, password], function (err, dbRes) {
        if (err) {
          return res.json({
            status: 500,
            message: 'Cannot signup at the moment. Try again later.'
          });
        }
        var rows = dbRes.rows,
            rowCount = dbRes.rowCount;

        if (rowCount !== 1) {
          return res.status(401).json({
            status: 409,
            message: 'Incorrect Email or password'
          });
        }
        var user = rows[0];
        var id = user.id;

        var token = _authenticator2.default.generateToken({ id: id, email: email });
        return res.status(200).json({ status: 200, data: [{ token: token, user: user }] });
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;