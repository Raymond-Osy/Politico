'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @class OfficeValidator
  * @description Validations on party controller
  */
var OfficeValidator = function () {
  function OfficeValidator() {
    _classCallCheck(this, OfficeValidator);
  }

  _createClass(OfficeValidator, null, [{
    key: 'createOfficeValidator',

    /**
        * @static
        * @param {object} req - The request payload recieved from the router
        * @param {object} res - The response payload sent back from the controller
        * @returns {object} - error messege if a wrong input is passed
        * @memberOf PartyValidator
        */
    value: function createOfficeValidator(req, res, next) {
      var name = req.body.name;

      if (name) {
        if (typeof name !== 'string') {
          return res.status(400).send({
            status: 400,
            error: 'Name must contain letters only'
          });
        }
        if (name.length > 30) {
          return res.status(400).send({
            status: 400,
            error: 'Name too long'
          });
        }
        if (name.trim() === '') {
          return res.status(400).send({
            status: 400,
            error: 'Name must not be empty'
          });
        }
      } else {
        return res.status(400).send({
          status: 400,
          error: 'Name is not defined'
        });
      }
      next();
    }
  }]);

  return OfficeValidator;
}();

exports.default = OfficeValidator;