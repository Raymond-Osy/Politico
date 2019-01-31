const insertIntoUsers = 'INSERT INTO users(firstname, lastname, othernames, email, phoneNumber, passportUrl, password) values($1, $2, $3, $4, $5, $6, $7) RETURNING *';
const queryUsers = 'SELECT * from users where email = $1 and password = $2';

const Queries = {
  insertIntoUsers,
  queryUsers
};

export default Queries;
