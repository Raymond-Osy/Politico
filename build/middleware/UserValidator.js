'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @class UserValidator
  * @description Validations on User controller
  */
var UserValidator = function () {
  function UserValidator() {
    _classCallCheck(this, UserValidator);
  }

  _createClass(UserValidator, null, [{
    key: 'SigninValidator',

    /**
        * @static
        * @param {object} req - The request payload recieved from the router
        * @param {object} res - The response payload sent back from the controller
        * @returns {object} - a JSON response
        * @memberOf UserValidator
        */
    value: function SigninValidator(req, res, next) {
      var errors = {};
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          othername = _req$body.othername,
          email = _req$body.email,
          phoneNumber = _req$body.phoneNumber,
          passportUrl = _req$body.passportUrl,
          password = _req$body.password,
          confirmPassword = _req$body.confirmPassword;

      if (firstname) {
        if (!/^[a-zA-Z_ ]+$/.test(firstname)) {
          errors.firstname = 'Invalid characters, must contain letters only';
        } else if (firstname.trim() === '') {
          errors.firstname = 'Field is empthy, must contain a valid character';
        }
      } else {
        errors.firstname = 'First-Name is not defined';
      }

      if (lastname) {
        if (!/^[a-zA-Z_ ]+$/.test(lastname)) {
          errors.lastname = 'Invalid characters, must contain letters only';
        } else if (lastname.trim() === '') {
          errors.lastname = 'Field is empthy, must contain a valid character';
        }
      } else {
        errors.lastname = 'Last-Name is not defined';
      }

      if (othername) {
        if (!/^[a-zA-Z_ ]+$/.test(othername)) {
          errors.othername = 'Invalid characters, must contain letters only';
        } else if (othername.trim() === '') {
          errors.othername = 'Field is empthy, must contain a valid character';
        }
      } else {
        errors.othernames = 'Other-Name is not defined';
      }

      if (email) {
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          errors.email = 'Invalid email';
        } else if (email === '') {
          errors.email = 'Must contain email';
        }
      } else {
        errors.email = 'Email is not defined';
      }

      if (phoneNumber) {
        if (!/^[+\d\-\s]+$/.test(phoneNumber)) {
          errors.phoneNumber = 'Invalid Phone Number';
        }
      } else {
        errors.phoneNumber = 'Phone Number is not defined';
      }

      if (passportUrl) {
        if (passportUrl.trim() === '') {
          return res.status(400).send({
            status: 400,
            error: 'passportUrl must not be empty'
          });
        }
      } else {
        return res.status(400).send({
          status: 400,
          error: 'passportUrl is not defined'
        });
      }

      if (password) {
        if (password === '') {
          errors.password = 'Password Empty';
        } else if (/\s/.test(password)) {
          errors.password = 'space not allowed on password';
        }
      } else {
        errors.password = 'Password is not defined';
      }

      if (confirmPassword) {
        if (confirmPassword === '') {
          errors.confirmPassword = 'Please Retype Password';
        } else if (password !== confirmPassword) {
          errors.confirmPassword = 'Password does not match';
        }
      } else {
        errors.confirmPassword = 'Undefined field, confirm Password';
      }
      // check if there where any errors
      var errorLength = Object.keys(errors).length;
      if (errorLength === 0) {
        next();
      } else {
        res.status(400).json({ status: 400, message: 'Please check your inputs', errors: errors });
      }
    }

    /**
        * @static
        * @param {object} req - The request payload recieved from the router
        * @param {object} res - The response payload sent back from the controller
        * @returns {object} - a JSON response
        * @memberOf UserValidator
        */

  }, {
    key: 'LoginValidator',
    value: function LoginValidator(req, res, next) {
      var errors = {};
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;


      if (email) {
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          errors.email = 'invalid email';
        } else if (email === '') {
          errors.email = 'invalid email';
        }
      } else {
        errors.email = 'Email is not defimed';
      }

      if (password) {
        if (password === '') {
          errors.password = 'Password Empty';
        } else if (/\s/.test(password)) {
          errors.password = 'space not allowed on password';
        }
      } else {
        errors.password = 'Password is not defined';
      }

      var errorLength = Object.keys(errors).length;
      if (errorLength === 0) {
        next();
      } else {
        res.status(400).json({ status: 400, message: 'Please check your inputs', errors: errors });
      }
      next();
    }
  }]);

  return UserValidator;
}();

exports.default = UserValidator;