import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import generator from './generator';
chai.use(chaiHttp)
const expect = chai.expect;
let authToken;
let userToken;
describe('Trips', () => {
  before((done) => {
    generator.generateUsers();
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Content-type', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({email : 'bihames4vainqueur@gmail.com', password : 'usertest'})
      .then(res => {
        authToken = res.body.data.token;
        //done();
      });
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Content-type', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({email : 'georgeTest@gmail.com', password : 'usertest'})
      .then(res => {
        userToken = res.body.data.token;
        done();
      });
  });
  it('should return an error with a 401 status when the user is not authenticated', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Content-type', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({
        seating_capacity: 80,
        origin: "Goma",
        destination: "Kampala",
        trip_date: "08/25/2020",
        fare: 35.000,
        bus_licence_number : 'BL025525666'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(401)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an error with a 403 status when the authenticated user is not an admin', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Content-type', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        seating_capacity: 80,
        origin: "Kampala",
        destination: "Gisenyi",
        trip_date: "08/25/2020",
        fare: 35.000,
        bus_licence_number : 'BL025525666'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an error with a 400 status when the request is sent with invalid credentials ( for a trip to be created )', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Content-type', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${authToken}`)
      .send({})
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an object with a data property and a 201 status when the authenticated user create a trip with valid credentials', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Content-type', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        seating_capacity: 80,
        origin: "Goma",
        destination: "Kampala",
        trip_date: "08/25/2020",
        fare: 35.000,
        bus_licence_number : 'BL025525666'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('data')
        done();
      })
  });
  it('should return an object with an error property and a 401 status when the user is not authenticated while cancelling a trip', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${1}/cancel`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer wrongtoken`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(401)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an object with an error property and a 403 status when the authenticated user is not an admin while cancelling a trip', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${1}/cancel`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an object with an error property and a 400 status when the trip is invalid while cancelling a trip', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/trip_id/cancel`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an object with an error property and a 404 status when the trip is not found while cancelling a trip', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${15548518}/cancel`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an object with an error property and a 404 status when the trip is not found while cancelling a trip', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${2145422122}/cancel`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an object with a data property and a 200 status while cancelling a trip', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${1}/cancel`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.have.property('message')
        done();
      })
  });
  it('should return an object with an error property and a 400 status when the trip is invalid while viewing a specific trip', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trips/trip_id/`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an object with an error property and a 404 status when the trip is not found while viewing a specific trip', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${15548518}/cancel`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        done();
      })
  });
  
  it('should return an object with a data property and a 200 status while viewing a trip', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trips/${1}`)
      .set('Content-type', 'application/json')
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.have.property('trip_id')
        done();
      })
  });
  it('should return an object with a data property and a 200 status while viewing trips being authenticated', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trips`)
      .set('Content-type', 'application/json')
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.be.an('array')
        done();
      })
  });
  it('should return an object with an error property with a 400 status when there is no destination or origin specified for filtering trips', (done) => {
    chai
      .request(app)
      .get(`/api/v1/filter/trips`)
      .set('Content-type', 'application/json')
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('error')
        expect(res.body.status).to.equal(400)
        done();
      })
  });

  it('should return an object with a data property and a 200 status while viewing trips being authenticated', (done) => {
    chai
      .request(app)
      .get(`/api/v1/filter/trips?origin=Goma`)
      .set('Content-type', 'application/json')
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.be.an('array')
        expect(res.body.status).to.equal(200)
        done();
      })
  });

});
