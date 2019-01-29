import db from './index';

const createUserTable = `CREATE TABLE users(
    Id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    othernames VARCHAR,
    email VARCHAR(40) UNIQUE NOT NULL,
    phoneNumber VARCHAR(40),
    passportUrl VARCHAR,
    password VARCHAR(40) NOT NULL,
    isAdmin Boolean default false)`;

const createPartyTable = `CREATE TABLE party(
    Id SERIAL PRIMARY KEY,
    name VARCHAR,
    hqAddress VARCHAR(255),
    logoUrl VARCHAR
)`;

const createOfficeTable = `CREATE TABLE office(
    Id SERIAL PRIMARY KEY,
    type VARCHAR(100),
    name VARCHAR
)`;

const createCandidateTable = `CREATE TABLE candidate(
    Id SERIAL PRIMARY KEY,
    office INTEGER REFERENCES office(Id),
    party INTEGER REFERENCES party(Id)
)`;

const createVoteTable = `CREATE TABLE vote(
    Id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP default current_timestamp,
    createdBy INT,
    office INTEGER,
    candidate INTEGER
)`;

db.query(createUserTable, (err) => {
  if (err) {
    console.log(`could not create user table ${err}`);
  }
});

db.query(createPartyTable, (err) => {
  if (err) {
    console.log(`could not create party table ${err}`);
  }
});

db.query(createOfficeTable, (err) => {
  if (err) {
    console.log(`could not create office table ${err}`);
  }
});

db.query(createCandidateTable, (err) => {
  if (err) {
    console.log(`could not create candidate table ${err}`);
  }
});

db.query(createVoteTable, (err) => {
  if (err) {
    console.log(`could not create vote table ${err}`);
  }
});
