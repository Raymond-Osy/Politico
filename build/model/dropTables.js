'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropUserTable = 'DROP TABLE IF EXISTS users CASCADE;';
var dropPartyTable = 'DROP TABLE IF EXISTS party CASCADE;';
var dropOfficeTable = 'DROP TABLE IF EXISTS office CASCADE;';
var dropCandidateTable = 'DROP TABLE IF EXISTS candidate CASCADE;';
var dropVoteTable = 'DROP TABLE IF EXISTS vote CASCADE;';

_index2.default.query(dropUserTable, function (err) {
  if (err) {
    console.log('could not drop user table ' + err);
  }
});

_index2.default.query(dropPartyTable, function (err) {
  if (err) {
    console.log('could not drop party table ' + err);
  }
});

_index2.default.query(dropOfficeTable, function (err) {
  if (err) {
    console.log('could not drop office table ' + err);
  }
});

_index2.default.query(dropCandidateTable, function (err) {
  if (err) {
    console.log('could not drop candidate table ' + err);
  }
});

_index2.default.query(dropVoteTable, function (err) {
  if (err) {
    console.log('could not drop vote table ' + err);
  }
});