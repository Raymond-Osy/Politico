import db from './index';

const createUserTable = `CREATE TABLE users(
    Id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    othername VARCHAR,
    email VARCHAR(40) UNIQUE NOT NULL,
    phoneNumber VARCHAR(40),
    passportUrl VARCHAR,
    password VARCHAR(75) NOT NULL,
    isAdmin Boolean default false)`;

const createPartyTable = `CREATE TABLE party(
    Id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE,
    hqAddress VARCHAR(255),
    logoUrl VARCHAR
)`;

const createOfficeTable = `CREATE TABLE office(
    Id SERIAL PRIMARY KEY,
    type VARCHAR(100),
    name VARCHAR UNIQUE
)`;

const createCandidateTable = `CREATE TABLE candidate(
    office INTEGER REFERENCES office(id),
    party INTEGER REFERENCES party(Id),
    candidate INTEGER UNIQUE REFERENCES users(id),
    PRIMARY KEY (office, candidate)
)`;

const createVoteTable = `CREATE TABLE vote(
    Id SERIAL,
    createdOn TIMESTAMP default current_timestamp,
    createdBy INTEGER REFERENCES users(id),
    office INTEGER REFERENCES office(id),
    candidate INTEGER REFERENCES candidate(candidate),
    PRIMARY KEY (office, createdBy)
)`;

db.query(createUserTable, (err) => {
  if (err) {
    console.log(`could not create user table ${err}`);
  } else {
    db.query(createPartyTable, (err) => {
      if (err) {
        console.log(`could not create party table ${err}`);
      } else {
        db.query(createOfficeTable, (err) => {
          if (err) {
            console.log(`could not create office table ${err}`);
          } else {
            db.query(createCandidateTable, (err) => {
              if (err) {
                console.log(`could not create candidate table ${err}`);
              } else {
                db.query(createVoteTable, (err) => {
                  if (err) {
                    console.log(`could not create vote table ${err}`);
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
