import db from './index';
import Authenticator from '../middleware/authenticator';

const hashedPassword = Authenticator.hashPassword('secret123');

const insertIntoUsers = `INSERT INTO users(
  firstname,
  lastname,
  othername,
  email,
  phoneNumber,
  passportUrl,
  password,
  isAdmin)
  values('Raymond', 'Akalonu', 'Osinachi', 'raymond@mail.com', '09012345678', 'https://via.placeholder.com/650x450', '${hashedPassword}', 'TRUE'),
  ('Fizz', 'Bozz', 'Lorem', 'fizzbozz@mail.com', '09000000000', 'https://via.placeholder.com/650x450', '${hashedPassword}', 'FALSE'),
  ('Test', 'Danny', 'Lorem', 'test@mail.com', '09000000000', 'https://via.placeholder.com/650x450', '${hashedPassword}', 'TRUE'),
  ('John', 'Doe', 'Lorem', 'lorem@mail.com', '09000000000', 'https://via.placeholder.com/650x450', '${hashedPassword}', 'FALSE')`;

const insertIntoOffice = `INSERT INTO office(
    type,
    name)
    values('Federal Government', 'President'),
    ('State Government', 'Governor')`;

const insertIntoParty = `INSERT INTO party( name, hqAddress, logoUrl)
      values('APC', '123, Party road, Abuja', 'https://res.cloudinary.com/raymondosy/image/upload/v1559525094/img/apclogo_g4os2o.png'),
      ('PDP', '345, Party road Abuja', 'https://res.cloudinary.com/raymondosy/image/upload/v1559525094/img/PDPlogo_u3qi09.jpg'),
      ('APGA', '345, Party road Abuja', 'https://res.cloudinary.com/raymondosy/image/upload/v1559525094/img/apgalogo_uwxx9d.png'),
      ('ACN', '345, Party road Abuja', 'https://res.cloudinary.com/raymondosy/image/upload/v1559525094/img/ACNlogo_pj7qzn.jpg'),
      ('SDP', '345, Party road Abuja', 'https://res.cloudinary.com/raymondosy/image/upload/v1559525094/img/sdplogo_xygiag.webp'),
      ('APCN', '123, Party road, Abuja', 'https://res.cloudinary.com/raymondosy/image/upload/v1559525094/img/apclogo_g4os2o.png')`;

const insertIntoCandidate = `INSERT INTO candidate(office, party, candidate)
      values('1', '1', '1'),
      ('1', '2', '2')`;

const insertIntoVote = `INSERT INTO vote(createdby, office, candidate)
      values('1', '1', '1'),
      ('2', '1', '2')`;

db.query(insertIntoUsers, (err) => {
  if (err) {
    console.log(`could not populate users table ${err}`);
  } else {
    db.query(insertIntoOffice, (err) => {
      if (err) {
        console.log(`could not populate office table ${err}`);
      } else {
        db.query(insertIntoParty, (err) => {
          if (err) {
            console.log(`could not populate party table ${err}`);
          } else {
            db.query(insertIntoCandidate, (err) => {
              if (err) {
                console.log(`could not populate candidate table ${err}`);
              } else {
                db.query(insertIntoVote, (err) => {
                  if (err) {
                    console.log(`could not populate vote table ${err}`);
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
