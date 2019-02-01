const insertIntoUsers = 'INSERT INTO users(firstname, lastname, othernames, email, phoneNumber, passportUrl, password) values($1, $2, $3, $4, $5, $6, $7) RETURNING *';
const queryUsers = 'SELECT * from users where email = $1 and password = $2';

const createOffice = 'INSERT INTO office(type, name) values($1, $2) RETURNING *';
const getAllOffices = 'SELECT * from office';
const getAnOfficeById = 'SELECT * FROM office WHERE id = $1';

const getAllParties = 'SELECT * from party';


const Queries = {
  insertIntoUsers,
  queryUsers,
  createOffice,
  getAllOffices,
  getAnOfficeById,
  getAllParties
};

export default Queries;
