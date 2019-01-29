'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dummydbParties = require('../database/dummydbParties');

var _dummydbParties2 = _interopRequireDefault(_dummydbParties);

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
      if (_dummydbParties2.default.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'No Parties available at this time'
        });
      }
      return res.status(200).json({
        status: 200,
        data: _dummydbParties2.default
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
      var party = {
        id: _dummydbParties2.default.length === 0 ? 1 : _dummydbParties2.default.length + 1,
        name: req.body.name,
        hqAddress: req.body.hqAddress,
        logoUrl: req.body.logoUrl
      };

      _dummydbParties2.default.push(party);
      return res.status(201).send({
        status: 201,
        data: _dummydbParties2.default
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
      var id = req.params.id;

      var party = _dummydbParties2.default.find(function (p) {
        return p.id === parseInt(req.params.id);
      });
      if (!party) {
        return res.status(404).json({
          status: 404,
          error: 'Party with the given Id ' + id + ' does not exist'
        });
      }
      return res.status(200).json({
        status: 200,
        data: party
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
      var id = req.params.id;

      var party = _dummydbParties2.default.find(function (p) {
        return p.id === parseInt(req.params.id);
      });
      if (!party) {
        return res.status(404).json({
          status: 404,
          error: 'Party with the given Id ' + id + ' was not found'
        });
      }
      var index = _dummydbParties2.default.indexOf(party);
      _dummydbParties2.default.splice(index, 1);

      return res.status(200).json({
        status: 200,
        data: party
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
      var party = _dummydbParties2.default.find(function (p) {
        return p.id === parseInt(req.params.id);
      });
      if (!party) {
        return res.status(404).json({
          status: 404,
          error: 'Party with the given Id was not found'
        });
      }
      var partyId = _dummydbParties2.default.id;
      party.name = req.body.name;
      res.status(200).json({
        status: 200,
        data: [{
          id: partyId,
          party: party
        }]
      });
    }
  }]);

  return PartyController;
}();

exports.default = PartyController;