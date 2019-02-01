'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var insertIntoUsers = 'INSERT INTO users(firstname, lastname, othernames, email, phoneNumber, passportUrl, password) values($1, $2, $3, $4, $5, $6, $7) RETURNING *';
var queryUsers = 'SELECT * from users where email = $1 and password = $2';

var createOffice = 'INSERT INTO office(type, name) values($1, $2) RETURNING *';
var getAllOffices = 'SELECT * from office';
var getAnOfficeById = 'SELECT * FROM office WHERE id = $1';

var getAllParties = 'SELECT * from party';
var createParty = 'INSERT INTO party(name, hqaddress, logourl) values($1, $2, $3) RETURNING *';
var getPartyById = 'SELECT * FROM party WHERE id = $1';
var deleteParty = 'DELETE from party where id = $1';
var updateParty = 'UPDATE party SET name = $1 WHERE id = $2';

var getCandidate = 'SELECT * FROM candidate WHERE candidate = $1';
var createCandidate = 'INSERT INTO candidate(office, party, candidate) values($1, $2, $3) RETURNING *';

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
  createCandidate: createCandidate
};

exports.default = Queries;