'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUserTable = 'CREATE TABLE users(\n    Id SERIAL PRIMARY KEY,\n    firstname VARCHAR,\n    lastname VARCHAR,\n    othernames VARCHAR,\n    email VARCHAR(40) UNIQUE NOT NULL,\n    phoneNumber VARCHAR(40),\n    passportUrl VARCHAR,\n    password VARCHAR(40) NOT NULL,\n    isAdmin Boolean default false)';

var createPartyTable = 'CREATE TABLE party(\n    Id SERIAL PRIMARY KEY,\n    name VARCHAR,\n    hqAddress VARCHAR(255),\n    logoUrl VARCHAR\n)';

var createOfficeTable = 'CREATE TABLE office(\n    Id SERIAL PRIMARY KEY,\n    type VARCHAR(100),\n    name VARCHAR\n)';

var createCandidateTable = 'CREATE TABLE candidate(\n    Id SERIAL PRIMARY KEY,\n    office INTEGER REFERENCES office(id),\n    party INTEGER REFERENCES party(Id),\n    candidate INTEGER UNIQUE REFERENCES users(id)\n)';

var createVoteTable = 'CREATE TABLE vote(\n    Id SERIAL PRIMARY KEY,\n    createdOn TIMESTAMP default current_timestamp,\n    createdBy INTEGER REFERENCES users(id),\n    office INTEGER REFERENCES office(id),\n    candidate INTEGER REFERENCES candidate(id)\n)';

_index2.default.query(createUserTable, function (err) {
  if (err) {
    console.log('could not create user table ' + err);
  } else {
    _index2.default.query(createPartyTable, function (err) {
      if (err) {
        console.log('could not create party table ' + err);
      } else {
        _index2.default.query(createOfficeTable, function (err) {
          if (err) {
            console.log('could not create office table ' + err);
          } else {
            _index2.default.query(createCandidateTable, function (err) {
              if (err) {
                console.log('could not create candidate table ' + err);
              } else {
                _index2.default.query(createVoteTable, function (err) {
                  if (err) {
                    console.log('could not create vote table ' + err);
                  } else {
                    console.log('successfully created tables');
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