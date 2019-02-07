import db from './index';

const insertIntoUsers = `INSERT INTO users(
  firstname,
  lastname,
  othernames,
  email,
  phoneNumber,
  passportUrl,
  password,
  isAdmin)
  values('Raymond', 'Akalonu', 'Osinachi', 'ray@mail.com', '09012345678', 'https://via.placeholder.com/650x450', 'secret', 'TRUE'),
  ('Jonathan', 'Philip', 'Bigjoe', 'bigjoe@mail.com', '07000000000', 'https://via.placeholder.com/650x450', 'secret', 'FALSE'),
  ('John', 'Doe', 'Lorem', 'johndoe@yahoo.com', '08000000000', 'https://via.placeholder.com/650x450', 'secret', 'FALSE'),
  ('Lorem', 'Ipsum', 'Charles', 'lorem@yahoo.com', '09000000000', 'https://via.placeholder.com/650x450', 'secret', 'FALSE')`;

const insertIntoOffice = `INSERT INTO office(
    type,
    name)
    values('Federal Government', 'President'),
    ('State Government', 'Governor')`;

const insertIntoParty = `INSERT INTO party( name, hqaddress, logourl)
      values('APC', '123, Party road, Abuja', 'https://via.placeholder.com/650x450'),
      ('PDP', '345, Party road Abuja', 'https://via.placeholder.com/650x450')`;

const insertIntoCandidate = `INSERT INTO candidate(office, party, candidate)
      values('1', '1', '1'),
      ('1', '2', '2')`;

const insertIntoVote = `INSERT INTO vote(createdby, office, candidate)
      values('3', '1', '1'),
      ('4', '1', '2')`;

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
