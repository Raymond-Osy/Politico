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

var _authenticator = require('../middleware/authenticator');

var _authenticator2 = _interopRequireDefault(_authenticator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOffice = _OfficeController2.default.createOffice,
    getAllOffices = _OfficeController2.default.getAllOffices,
    getAnOfficeById = _OfficeController2.default.getAnOfficeById,
    registerCandidate = _OfficeController2.default.registerCandidate,
    fetchResults = _OfficeController2.default.fetchResults;
var createOfficeValidator = _OfficeValidator2.default.createOfficeValidator;


var officeRouter = _express2.default.Router();

officeRouter.post('/', createOfficeValidator, _authenticator2.default.isAuthenticated, _authenticator2.default.isAuthorised, createOffice);
officeRouter.get('/', _authenticator2.default.isAuthenticated, getAllOffices);
officeRouter.get('/:id', _authenticator2.default.isAuthenticated, getAnOfficeById);
officeRouter.post('/:userId/register', _authenticator2.default.isAuthenticated, _authenticator2.default.isAuthorised, registerCandidate);
officeRouter.get('/:officeId/results', _authenticator2.default.isAuthenticated, fetchResults);

exports.default = officeRouter;