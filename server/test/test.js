import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

describe('Get a non-existing url/page', () => {
  it('Should return a 404 response for unknown routes', (done) => {
    chai.request(app)
      .get('/invalid/route')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

/*
* Test for all the routes under /PARTIES
*/
describe('All requests to /Parties', () => {
  describe('/GET/ party', () => {
    it('Should return response 200', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('/GET/:id party', () => {
    it('should return response 200', (done) => {
      chai.request(app)
        .get('/api/v1/parties/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('/POST party', () => {
    const party = {
      id: 1,
      name: 'APC',
      hqAddress: '123 williams Akins, Lagos, Nigeria',
      logoUrl: 'Image Url 1 goes here'
    };
    it('should add a new party to the database', (done) => {
      chai.request(app)
        .post('/api/v1/parties/')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('/DELETE/:id party', () => {
    it('should add a new party to the database', (done) => {
      chai.request(app)
        .delete('/api/v1/parties/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('/PATCH/:id/name', () => {
    it('should edit the name for a particular party', (done) => {
      chai.request(app)
        .patch('/api/v1/parties/3/name')
        .send({ name: 'new name' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });
});


/*
* Test for all the routes under /OFFICES
*/
describe('All requests to /offices', () => {
  describe('/GET/ office', () => {
    it('Should return response 200', (done) => {
      chai.request(app)
        .get('/api/v1/offices')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('/GET/:id office', () => {
    it('should return response 200', (done) => {
      chai.request(app)
        .get('/api/v1/offices/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('/POST office', () => {
    const office = {
      id: 1,
      type: 'Local Government',
      name: 'Vice Counselour'
    };
    it('should add a new office to the database', (done) => {
      chai.request(app)
        .post('/api/v1/offices/')
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
