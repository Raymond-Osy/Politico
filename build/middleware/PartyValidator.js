'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @class PartyValidator
  * @description Validations on party controller
  */
var PartyValidator = function () {
  function PartyValidator() {
    _classCallCheck(this, PartyValidator);
  }

  _createClass(PartyValidator, null, [{
    key: 'createPartyValidator',

    /**
      * @static
      * @param {object} req - The request payload recieved from the router
      * @param {object} res - The response payload sent back from the controller
      * @returns {object} - error messege if a wrong input is passed
      * @memberOf PartyValidator
      */
    value: function createPartyValidator(req, res, next) {
      var _req$body = req.body,
          name = _req$body.name,
          hqAddress = _req$body.hqAddress,
          logoUrl = _req$body.logoUrl;

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

      // Head quarter validations
      if (hqAddress) {
        if (hqAddress.length > 100) {
          return res.status(400).send({
            status: 400,
            error: 'Address too long'
          });
        }
        if (hqAddress.trim() === '') {
          return res.status(400).send({
            status: 400,
            error: 'Address must not be empty'
          });
        }
      } else {
        return res.status(400).send({
          status: 400,
          error: 'Address is not defined'
        });
      }

      // LogoUrl Validation
      if (logoUrl) {
        if (typeof logoUrl !== 'string') {
          return res.status(400).send({
            status: 400,
            error: 'Logo URL must be a string'
          });
        }
        if (logoUrl.trim() === '') {
          return res.status(400).send({
            status: 400,
            error: 'Logo Url must not be empty'
          });
        }
      } else {
        return res.status(400).send({
          status: 400,
          error: 'Logo Url is not defined'
        });
      }
      next();
    }
  }]);

  return PartyValidator;
}();

exports.default = PartyValidator;