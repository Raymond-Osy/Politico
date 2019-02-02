import db from './index';

const dropUserTable = 'DROP TABLE IF EXISTS users CASCADE;';
const dropPartyTable = 'DROP TABLE IF EXISTS party CASCADE;';
const dropOfficeTable = 'DROP TABLE IF EXISTS office CASCADE;';
const dropCandidateTable = 'DROP TABLE IF EXISTS candidate CASCADE;';
const dropVoteTable = 'DROP TABLE IF EXISTS vote CASCADE;';


db.query(dropUserTable, (err) => {
  if (err) {
    console.log(`could not drop user table ${err}`);
  } else {
    db.query(dropPartyTable, (err) => {
      if (err) {
        console.log(`could not drop party table ${err}`);
      } else {
        db.query(dropOfficeTable, (err) => {
          if (err) {
            console.log(`could not drop office table ${err}`);
          } else {
            db.query(dropCandidateTable, (err) => {
              if (err) {
                console.log(`could not drop candidate table ${err}`);
              } else {
                db.query(dropVoteTable, (err) => {
                  if (err) {
                    console.log(`could not drop vote table ${err}`);
                  } else {
                    console.log('tables where successfully droped');
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
