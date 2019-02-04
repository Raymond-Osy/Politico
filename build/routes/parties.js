'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _PartyController = require('../controllers/PartyController');

var _PartyController2 = _interopRequireDefault(_PartyController);

var _PartyValidator = require('../middleware/PartyValidator');

var _PartyValidator2 = _interopRequireDefault(_PartyValidator);

var _authenticator = require('../middleware/authenticator');

var _authenticator2 = _interopRequireDefault(_authenticator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllParties = _PartyController2.default.getAllParties,
    createParty = _PartyController2.default.createParty,
    getAPartyById = _PartyController2.default.getAPartyById,
    deleteParty = _PartyController2.default.deleteParty,
    editParty = _PartyController2.default.editParty;
var createPartyValidator = _PartyValidator2.default.createPartyValidator;


var partyRouter = _express2.default.Router();

partyRouter.get('/', _authenticator2.default.isAuthenticated, getAllParties);
partyRouter.post('/', _authenticator2.default.isAuthenticated, createPartyValidator, createParty);
partyRouter.get('/:id', _authenticator2.default.isAuthenticated, getAPartyById);
partyRouter.delete('/:id', _authenticator2.default.isAuthenticated, deleteParty);
partyRouter.patch('/:id/name', _authenticator2.default.isAuthenticated, editParty);

exports.default = partyRouter;