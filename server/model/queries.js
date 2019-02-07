const insertIntoUsers = 'INSERT INTO users(firstname, lastname, othernames, email, phoneNumber, passportUrl, password) values($1, $2, $3, $4, $5, $6, $7) RETURNING *';
const queryUsers = 'SELECT * from users where email = $1 and password = $2';

const createOffice = 'INSERT INTO office(type, name) values($1, $2) RETURNING *';
const getAllOffices = 'SELECT * from office';
const getAnOfficeById = 'SELECT * FROM office WHERE id = $1';

const getAllParties = 'SELECT * from party';
const createParty = 'INSERT INTO party(name, hqaddress, logourl) values($1, $2, $3) RETURNING *';
const getPartyById = 'SELECT * FROM party WHERE id = $1';
const deleteParty = 'DELETE from party where id = $1';
const updateParty = 'UPDATE party SET name = $1 WHERE id = $2';

const getCandidate = 'SELECT * FROM candidate WHERE candidate = $1';
const createCandidate = 'INSERT INTO candidate(office, party, candidate) values($1, $2, $3) RETURNING *';

const createVote = 'INSERT INTO vote(createdby, candidate, office) values($1, $2, $3) RETURNING *';
const checkIfVoteExists = 'SELECT * from vote where createdby = $1 and office = $2';
const queryVotesByOfficeId = 'SELECT * from vote where office = $1';
const queryCandidatesByOfficeId = 'SELECT * FROM candidate where office = $1';

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
