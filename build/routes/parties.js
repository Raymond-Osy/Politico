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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllParties = _PartyController2.default.getAllParties,
    getAPartyById = _PartyController2.default.getAPartyById,
    createParty = _PartyController2.default.createParty,
    deleteParty = _PartyController2.default.deleteParty,
    editParty = _PartyController2.default.editParty;
var createPartyValidator = _PartyValidator2.default.createPartyValidator;


var partyRouter = _express2.default.Router();

partyRouter.get('/', getAllParties);
partyRouter.get('/:id', getAPartyById);
partyRouter.post('/', createPartyValidator, createParty);
partyRouter.delete('/:id', deleteParty);
partyRouter.patch('/:id/name', editParty);

exports.default = partyRouter;