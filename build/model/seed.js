'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertIntoUsers = 'INSERT INTO users(\n  firstname,\n  lastname,\n  othername,\n  email,\n  phoneNumber,\n  passportUrl,\n  password,\n  isAdmin)\n  values(\'Raymond\', \'Akalonu\', \'Osinachi\', \'ray@mail.com\', \'09012345678\', \'https://via.placeholder.com/650x450\', \'secret\', \'TRUE\'),\n  (\'Jonathan\', \'Philip\', \'Bigjoe\', \'bigjoe@mail.com\', \'07000000000\', \'https://via.placeholder.com/650x450\', \'secret\', \'FALSE\'),\n  (\'John\', \'Doe\', \'Lorem\', \'johndoe@yahoo.com\', \'08000000000\', \'https://via.placeholder.com/650x450\', \'secret\', \'FALSE\'),\n  (\'Lorem\', \'Ipsum\', \'Charles\', \'lorem@yahoo.com\', \'09000000000\', \'https://via.placeholder.com/650x450\', \'secret\', \'FALSE\')';

var insertIntoOffice = 'INSERT INTO office(\n    type,\n    name)\n    values(\'Federal Government\', \'President\'),\n    (\'State Government\', \'Governor\')';

var insertIntoParty = 'INSERT INTO party( name, hqAddress, logoUrl)\n      values(\'APC\', \'123, Party road, Abuja\', \'https://via.placeholder.com/650x450\'),\n      (\'PDP\', \'345, Party road Abuja\', \'https://via.placeholder.com/650x450\')';

var insertIntoCandidate = 'INSERT INTO candidate(office, party, candidate)\n      values(\'1\', \'1\', \'1\'),\n      (\'1\', \'2\', \'2\')';

var insertIntoVote = 'INSERT INTO vote(createdby, office, candidate)\n      values(\'3\', \'1\', \'1\'),\n      (\'4\', \'1\', \'2\')';

_index2.default.query(insertIntoUsers, function (err) {
  if (err) {
    console.log('could not populate users table ' + err);
  } else {
    _index2.default.query(insertIntoOffice, function (err) {
      if (err) {
        console.log('could not populate office table ' + err);
      } else {
        _index2.default.query(insertIntoParty, function (err) {
          if (err) {
            console.log('could not populate party table ' + err);
          } else {
            _index2.default.query(insertIntoCandidate, function (err) {
              if (err) {
                console.log('could not populate candidate table ' + err);
              } else {
                _index2.default.query(insertIntoVote, function (err) {
                  if (err) {
                    console.log('could not populate vote table ' + err);
                  } else {
                    console.log('seed successful');
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});