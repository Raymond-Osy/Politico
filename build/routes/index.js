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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/parties', _parties2.default);
router.use('/offices', _offices2.default);

exports.default = router;