'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _VoteController = require('../controllers/VoteController');

var _VoteController2 = _interopRequireDefault(_VoteController);

var _authenticator = require('../middleware/authenticator');

var _authenticator2 = _interopRequireDefault(_authenticator);

var _VoteValidator = require('../middleware/VoteValidator');

var _VoteValidator2 = _interopRequireDefault(_VoteValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createVote = _VoteController2.default.createVote;


var voteRouter = _express2.default.Router();

voteRouter.post('/', _authenticator2.default.isAuthenticated, _VoteValidator2.default.createVoteValidator, createVote);

exports.default = voteRouter;