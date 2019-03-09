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
var OfficeController = function () {
  function OfficeController() {
    _classCallCheck(this, OfficeController);
  }

  _createClass(OfficeController, null, [{
    key: 'createOffice',

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - a created office
    * @memberOf OfficeController
    */
    value: function createOffice(req, res) {
      var _req$body = req.body,
          type = _req$body.type,
          name = _req$body.name;


      name = name.trim();
      type = type.trim();
      var parameters = [type, name];

      _index2.default.query(_queries2.default.createOffice, parameters, function (err, dbRes) {
        if (err) {
          return res.status(500).json({ status: 500, error: 'Can not create office, Please check inputs and Try again later' });
        }
        var rows = dbRes.rows;
        // const office = rows[0];

        return res.status(201).json({ status: 201, data: rows });
      });
    }

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - List of all offices
    * @memberOf OfficeController
    */

  }, {
    key: 'getAllOffices',
    value: function getAllOffices(req, res) {
      _index2.default.query(_queries2.default.getAllOffices, function (err, dbRes) {
        if (err) {
          return res.status(500).json({ status: 500, error: 'Can not get all offices at the moment, Try again later' });
        }
        var rows = dbRes.rows;

        return res.status(200).json({ status: 200, data: rows });
      });
    }

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - The particular office
    * @memberOf OfficeController
    */

  }, {
    key: 'getAnOfficeById',
    value: function getAnOfficeById(req, res) {
      _index2.default.query(_queries2.default.getAnOfficeById, [req.params.id], function (err, dbRes) {
        if (err) {
          return res.status(500).json({ status: 500, error: 'Can not get a party at the moment, Try again later' });
        }
        var rows = dbRes.rows,
            rowCount = dbRes.rowCount;

        if (rowCount === 0) {
          return res.status(404).json({ status: 404, error: 'Office not found' });
        }
        return res.status(200).json({ status: 200, data: rows[0] });
      });
    }

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - registered candidate
    * @memberOf OfficeController
    */

  }, {
    key: 'registerCandidate',
    value: function registerCandidate(req, res) {
      var _req$body2 = req.body,
          office = _req$body2.office,
          party = _req$body2.party;

      // check if user is already registered

      _index2.default.query(_queries2.default.getCandidate, [req.params.userId], function (err, data) {
        if (err) {
          return res.status(500).json({ status: 500, error: 'Cannot register at the moment' });
        }
        var rowCount = data.rowCount;
        // checks the candidate table to see if there is candidate

        if (rowCount === 0) {
          _index2.default.query(_queries2.default.createCandidate, [office, party, req.params.userId], function (err, dbRes) {
            if (err) {
              return res.status(500).json({ status: 500, error: err.detail });
            }
            var rows = dbRes.rows;

            var candidate = rows[0];
            return res.status(201).json({
              status: 201,
              data: [{
                office: candidate.office,
                user: candidate.candidate
              }]
            });
          });
        } else {
          return res.status(409).json({ status: 409, error: 'Candidate is already registerd' });
        }
      });
    }

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - The particular office
    * @memberOf OfficeController
    */

  }, {
    key: 'fetchResults',
    value: function fetchResults(req, res) {
      _index2.default.query(_queries2.default.queryCandidatesByOfficeId, [req.params.officeId], function (err, dbRes) {
        if (err) {
          return res.status(500).json({ status: 500, error: err });
        }
        var rows = dbRes.rows,
            rowCount = dbRes.rowCount;

        if (rowCount === 0) {
          return res.status(404).json({ status: 404, error: 'votes not found' });
        }
        var candidates = rows.map(function (row) {
          return row.candidate;
        });
        _index2.default.query(_queries2.default.queryVotesByOfficeId, [req.params.officeId], function (err, dbres) {
          if (err) {
            return res.status(500).json({ status: 500, error: err });
          }
          if (dbres.rowCount === 0) {
            return res.status(404).json({ status: 404, error: 'Office not found' });
          }
          var votes = dbres.rows;
          var result = candidates.map(function (candidate) {
            var candidateResult = {
              office: req.params.officeId,
              candidate: candidate,
              result: 0
            };
            var individualVotes = votes.filter(function (vote) {
              return vote.candidate === candidate;
            });

            candidateResult.result = individualVotes.length;
            return candidateResult;
          });
          return res.status(200).json({ status: 200, data: result });
        });
      });
    }
  }]);

  return OfficeController;
}();

exports.default = OfficeController;