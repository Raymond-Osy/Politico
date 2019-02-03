/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
const should = chai.should();
let token = '';
let userId;
let partyId;
let officeId;

chai.use(chaiHttp);

const user = {
  email: 'johndoe@yahoo.com',
  firstname: 'john',
  lastname: 'doe',
  othernames: 'james',
  passportUrl: 'passportUrl',
  phoneNumber: 8065968899,
  password: 'secret',
  confirmPassword: 'secret'
};

describe('Users', function () {
  this.timeout(10000);
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        token = res.body.data[0].token;
        userId = res.body.data[0].user.id;
        done();
      });
  });
  it('Should login a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login').send(user)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        done();
      });
  });
});

describe('Office', () => {
  const office = {
    type: 'Local Government',
    name: 'Vice Counselour'
  };

  it('should add a new office to the database', (done) => {
    chai.request(app)
      .post('/api/v1/offices/')
      .send(office)
      .set('x-access-token', token)
      .end((err, res) => {
        officeId = res.body.data[0].office.id;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should get all offices', (done) => {
    chai.request(app)
      .get('/api/v1/offices/')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should get a single office', (done) => {
    chai.request(app)
      .get(`/api/v1/offices/${officeId}`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Parties', () => {
  const party = {
    name: 'APC',
    hqAddress: '123 williams Akins, Lagos, Nigeria',
    logoUrl: 'Image Url 1 goes here'
  };

  it('should add a new party to the database', (done) => {
    chai.request(app)
      .post('/api/v1/parties/')
      .send(party)
      .set('x-access-token', token)
      .end((err, res) => {
        partyId = res.body.data[0].party.id;
        expect(res.body).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should get all parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties/')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should get a single party', (done) => {
    chai.request(app)
      .get(`/api/v1/parties/${partyId}`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should modify a party name', (done) => {
    chai.request(app)
      .patch(`/api/v1/parties/${partyId}/name`)
      .send({ name: 'PDP' })
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should delete a single delete', (done) => {
    chai.request(app)
      .delete(`/api/v1/parties/${partyId}`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Candidate', function () {
  this.timeout(10000);
  before((done) => {
    chai.request(app)
      .post('/api/v1/parties/')
      .send({
        name: 'APC',
        hqAddress: '123 williams Akins, Lagos, Nigeria',
        logoUrl: 'imageUrl'
      })
      .set('x-access-token', token)
      .end((err, res) => {
        partyId = res.body.data[0].party.id;
        expect(res.body).to.have.status(201);
        expect(res.body).to.be.an('object');
      });
    chai.request(app)
      .post('/api/v1/offices/')
      .send({
        type: 'Local Government',
        name: 'Vice Counselour'
      })
      .set('x-access-token', token)
      .end((err, res) => {
        officeId = res.body.data[0].office.id;
        expect(res.body).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Register a candidate', (done) => {
    chai.request(app)
      .post(`/api/v1/offices/${userId}/register`)
      .send({ office: officeId, party: partyId })
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body).to.have.status(201);
        done();
      });
  });
});

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

describe('Hit the welcome route', () => {
  it('Should hit the welcome Route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Authentication', () => {
  it('Should return a 403 error response for invalid token', (done) => {
    chai.request(app)
      .get('/api/v1/offices/')
      .set('x-access-token', 'invalid-token')
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Should return a 403 error response for missing token', (done) => {
    chai.request(app)
      .get('/api/v1/offices/')
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});
