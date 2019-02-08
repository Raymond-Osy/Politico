'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var insertIntoUsers = 'INSERT INTO users(firstname, lastname, othername, email, phoneNumber, passportUrl, password) values($1, $2, $3, $4, $5, $6, $7) RETURNING *';
var queryUsers = 'SELECT * FROM users WHERE email = $1 and password = $2';

var createOffice = 'INSERT INTO office(type, name) values($1, $2) RETURNING *';
var getAllOffices = 'SELECT * FROM office';
var getAnOfficeById = 'SELECT * FROM office WHERE id = $1';

var getAllParties = 'SELECT * FROM party';
var createParty = 'INSERT INTO party(name, hqAddress, logoUrl) values($1, $2, $3) RETURNING *';
var getPartyById = 'SELECT * FROM party WHERE id = $1';
var deleteParty = 'DELETE FROM party WHERE id = $1';
var updateParty = 'UPDATE party SET name = $1 WHERE id = $2';

var getCandidate = 'SELECT * FROM candidate WHERE candidate = $1';
var createCandidate = 'INSERT INTO candidate(office, party, candidate) values($1, $2, $3) RETURNING *';

var createVote = 'INSERT INTO vote(createdby, candidate, office) values($1, $2, $3) RETURNING *';
var checkIfVoteExists = 'SELECT * FROM vote WHERE createdby = $1 and office = $2';
var queryVotesByOfficeId = 'SELECT * FROM vote WHERE office = $1';
var queryCandidatesByOfficeId = 'SELECT * FROM candidate WHERE office = $1';

var Queries = {
  insertIntoUsers: insertIntoUsers,
  queryUsers: queryUsers,
  createOffice: createOffice,
  getAllOffices: getAllOffices,
  getAnOfficeById: getAnOfficeById,
  getAllParties: getAllParties,
  createParty: createParty,
  getPartyById: getPartyById,
  deleteParty: deleteParty,
  updateParty: updateParty,
  getCandidate: getCandidate,
  createCandidate: createCandidate,
  createVote: createVote,
  checkIfVoteExists: checkIfVoteExists,
  queryVotesByOfficeId: queryVotesByOfficeId,
  queryCandidatesByOfficeId: queryCandidatesByOfficeId
};

exports.default = Queries;