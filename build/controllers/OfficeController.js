'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dummydbOffices = require('../database/dummydbOffices');

var _dummydbOffices2 = _interopRequireDefault(_dummydbOffices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = (0, _express2.default)();
app.use(_express2.default.json());

/**
  * @class OfficeController
  * @description CRUD operations on offices
  */

var OfficeController = function () {
  function OfficeController() {
    _classCallCheck(this, OfficeController);
  }

  _createClass(OfficeController, null, [{
    key: 'getAllOffices',

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - List of all offices
    * @memberOf OfficeController
    */
    value: function getAllOffices(req, res) {
      if (_dummydbOffices2.default.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'No Offices available at this time'
        });
      }
      return res.json({ offices: _dummydbOffices2.default });
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
      var id = req.params.id;

      var office = _dummydbOffices2.default.find(function (p) {
        return p.id === parseInt(req.params.id);
      });
      if (!office) {
        return res.status(404).json({
          status: 404,
          error: 'Office with the given Id ' + id + ' does not exist'
        });
      }
      return res.status(200).json({
        status: 200,
        data: office
      });
    }

    /**
    * @static
    * @param {object} req - The request payload recieved from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - a created office
    * @memberOf OfficeController
    */

  }, {
    key: 'createOffices',
    value: function createOffices(req, res) {
      var office = {
        id: _dummydbOffices2.default.length === 0 ? 1 : _dummydbOffices2.default.length + 1,
        type: req.body.type,
        name: req.body.name
      };

      _dummydbOffices2.default.push(office);
      return res.status(201).json({
        status: 201,
        data: _dummydbOffices2.default
      });
    }
  }]);

  return OfficeController;
}();

exports.default = OfficeController;