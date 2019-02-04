'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../model/index');

var _index2 = _interopRequireDefault(_index);

var _queries = require('../model/queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @class OfficeController
  * @description CRUD operations on offices
  */
var VoteController = function () {
  function VoteController() {
    _classCallCheck(this, VoteController);
  }

  _createClass(VoteController, null, [{
    key: 'createVote',

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - a response on success or failure
    * @memberOf VoteController
    */
    value: function createVote(req, res) {
      var _req$body = req.body,
          candidate = _req$body.candidate,
          office = _req$body.office;

      var createdBy = req.user.id;
      // check if user is already voted for this office
      _index2.default.query(_queries2.default.checkIfVoteExists, [createdBy, office], function (err, data) {
        if (err) {
          console.log(err, '>>>>>>>>>>>>>>>>>>');
          return res.json({ status: 500, error: 'Cannot vote at the moment' });
        }
        var rowCount = data.rowCount;

        if (rowCount === 0) {
          _index2.default.query(_queries2.default.createVote, [createdBy, candidate, office], function (err) {
            if (err) {
              return res.json({ status: 400, error: err });
            }
            return res.json({ status: 201, data: [{ office: office, candidate: candidate, voter: createdBy }] });
          });
        } else {
          return res.json({ status: 409, error: 'You have already voted for office with ID ' + office });
        }
      });
    }
  }]);

  return VoteController;
}();

exports.default = VoteController;