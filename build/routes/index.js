'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parties = require('./parties');

var _parties2 = _interopRequireDefault(_parties);

var _offices = require('./offices');

var _offices2 = _interopRequireDefault(_offices);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _votes = require('./votes');

var _votes2 = _interopRequireDefault(_votes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/parties', _parties2.default);
router.use('/offices', _offices2.default);
router.use('/auth', _users2.default);
router.use('/votes', _votes2.default);

exports.default = router;