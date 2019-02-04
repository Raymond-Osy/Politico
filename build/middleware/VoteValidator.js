'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @class VoteValidator
  * @description Validations on Vote controller
  */
var VoteValidator = function () {
  function VoteValidator() {
    _classCallCheck(this, VoteValidator);
  }

  _createClass(VoteValidator, null, [{
    key: 'createVoteValidator',

    /**
        * @static
        * @param {object} req - The request payload recieved from the router
        * @param {object} res - The response payload sent back from the controller
        * @returns {object} - error messege if a wrong input is passed
        * @memberOf VoteValidator
        */
    value: function createVoteValidator(req, res, next) {
      var _req$body = req.body,
          candidate = _req$body.candidate,
          office = _req$body.office;

      if (candidate) {
        if (!Number.isInteger(candidate)) {
          return res.status(400).send({
            status: 400,
            error: 'Candidate must be an integer'
          });
        }
      } else {
        return res.status(400).send({
          status: 400,
          error: 'Candidate is not defined'
        });
      }

      if (office) {
        if (!Number.isInteger(office)) {
          return res.status(400).send({
            status: 400,
            error: 'office must be an enteger'
          });
        }
      } else {
        return res.status(400).send({
          status: 400,
          error: 'Office is not defined'
        });
      }
      next();
    }
  }]);

  return VoteValidator;
}();

exports.default = VoteValidator;