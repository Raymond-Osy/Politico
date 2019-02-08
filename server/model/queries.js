const insertIntoUsers = 'INSERT INTO users(firstname, lastname, othername, email, phoneNumber, passportUrl, password) values($1, $2, $3, $4, $5, $6, $7) RETURNING *';
const queryUsers = 'SELECT * FROM users WHERE email = $1 and password = $2';

const createOffice = 'INSERT INTO office(type, name) values($1, $2) RETURNING *';
const getAllOffices = 'SELECT * FROM office';
const getAnOfficeById = 'SELECT * FROM office WHERE id = $1';

const getAllParties = 'SELECT * FROM party';
const createParty = 'INSERT INTO party(name, hqAddress, logoUrl) values($1, $2, $3) RETURNING *';
const getPartyById = 'SELECT * FROM party WHERE id = $1';
const deleteParty = 'DELETE FROM party WHERE id = $1';
const updateParty = 'UPDATE party SET name = $1 WHERE id = $2';

const getCandidate = 'SELECT * FROM candidate WHERE candidate = $1';
const createCandidate = 'INSERT INTO candidate(office, party, candidate) values($1, $2, $3) RETURNING *';

const createVote = 'INSERT INTO vote(createdby, candidate, office) values($1, $2, $3) RETURNING *';
const checkIfVoteExists = 'SELECT * FROM vote WHERE createdby = $1 and office = $2';
const queryVotesByOfficeId = 'SELECT * FROM vote WHERE office = $1';
const queryCandidatesByOfficeId = 'SELECT * FROM candidate WHERE office = $1';

const Queries = {
  insertIntoUsers,
  queryUsers,
  createOffice,
  getAllOffices,
  getAnOfficeById,
  getAllParties,
  createParty,
  getPartyById,
  deleteParty,
  updateParty,
  getCandidate,
  createCandidate,
  createVote,
  checkIfVoteExists,
  queryVotesByOfficeId,
  queryCandidatesByOfficeId
};

export default Queries;
