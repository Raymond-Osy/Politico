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
  * @class PartyController
  * @description CRUD operations on offices
  */
var PartyController = function () {
  function PartyController() {
    _classCallCheck(this, PartyController);
  }

  _createClass(PartyController, null, [{
    key: 'getAllParties',

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - List of all parties
    * @memberOf PartyController
    */
    value: function getAllParties(req, res) {
      _index2.default.query(_queries2.default.getAllParties, function (err, dbRes) {
        if (err) {
          return res.status(400).json({ status: 400, error: err });
        }
        var rows = dbRes.rows;

        return res.status(200).json({ status: 200, data: rows });
      });
    }

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - the created party
    * @memberOf PartyController
    */

  }, {
    key: 'createParty',
    value: function createParty(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          hqAddress = _req$body.hqAddress,
          logoUrl = _req$body.logoUrl;


      _index2.default.query(_queries2.default.createParty, [name, hqAddress, logoUrl], function (err, dbRes) {
        if (err) {
          return res.status(400).json({ status: 400, error: err });
        }
        var rows = dbRes.rows;

        var office = rows[0];
        return res.json({ status: 201, data: [{ office: office }] });
      });
    }

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - The particular party
    * @memberOf PartyController
    */

  }, {
    key: 'getAPartyById',
    value: function getAPartyById(req, res) {
      _index2.default.query(_queries2.default.getPartyById, [req.params.id], function (err, dbRes) {
        if (err) {
          return res.status(400).json({ status: 400, error: err });
        }
        var rows = dbRes.rows,
            rowCount = dbRes.rowCount;

        if (rowCount === 0) {
          return res.status(404).json({ status: 404, error: 'Party with ID ' + req.params.id + ' does not exist' });
        }
        return res.status(200).json({ status: 200, data: rows[0] });
      });
    }

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - The particular party deleted
    * @memberOf PartyController
    */

  }, {
    key: 'deleteParty',
    value: function deleteParty(req, res) {
      _index2.default.query(_queries2.default.deleteParty, [req.params.id], function (err, dbRes) {
        if (err) {
          return res.json({ sucess: false, message: 'Could not Delete entry', err: err });
        }
        if (dbRes.rowCount === 0) {
          return res.json({ sucess: false, message: 'Party with ID ' + req.params.id + ' does not exist', err: err });
        }
        return res.status(200).json({
          status: 200,
          data: 'Party with ID ' + req.params.id + ' was successfully deleted'
        });
      });
    }

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - The particular party name edited
    * @memberOf PartyController
    */

  }, {
    key: 'editParty',
    value: function editParty(req, res) {
      _index2.default.query(_queries2.default.updateParty, [req.body.name, req.params.id], function (err, dbRes) {
        if (err) {
          return res.json({ sucess: false, message: 'Could not update party', err: err });
        }
        if (dbRes.rowCount === 0) {
          return res.json({ sucess: false, message: 'Party with ID ' + req.params.id + ' does not exist', err: err });
        }
        return res.json({
          status: 200,
          data: {
            id: req.params.id,
            name: req.body.name
          }
        });
      });
    }
  }]);

  return PartyController;
}();

exports.default = PartyController;