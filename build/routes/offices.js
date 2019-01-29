'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _OfficeController = require('../controllers/OfficeController');

var _OfficeController2 = _interopRequireDefault(_OfficeController);

var _OfficeValidator = require('../middleware/OfficeValidator');

var _OfficeValidator2 = _interopRequireDefault(_OfficeValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllOffices = _OfficeController2.default.getAllOffices,
    getAnOfficeById = _OfficeController2.default.getAnOfficeById,
    createOffices = _OfficeController2.default.createOffices;
var createOfficeValidator = _OfficeValidator2.default.createOfficeValidator;


var officeRouter = _express2.default.Router();

officeRouter.get('/', getAllOffices);
officeRouter.get('/:id', getAnOfficeById);
officeRouter.post('/', createOfficeValidator, createOffices);

exports.default = officeRouter;