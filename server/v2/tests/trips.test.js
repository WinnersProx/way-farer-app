import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../';
chai.use(chaiHttp)
const expect = chai.expect;
let authToken;
let userToken;
describe('Trips', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v2/auth/signin')
      .set('Content-type', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({email : 'bihames4vainqueur@gmail.com', password : 'usertest'})
      .then(res => {
        authToken = res.body.data.token;
        //done();
      });
    chai
      .request(app)
      .post('/api/v2/auth/signin')
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
      .post('/api/v2/trips')
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
      .post('/api/v2/trips')
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
      .post('/api/v2/trips')
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
      .post('/api/v2/trips')
      .set('Content-type', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        seating_capacity: 80,
        origin: "Goma",
        destination: "Kampala",
        trip_date: "08/25/2020",
        fare: 35.000,
        bus_licence_number : 'BL025525688'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('data')
        done();
      })
  });
  it('should return an error with 400 status when the user create a trip that already exist', (done) => {
    chai
      .request(app)
      .post('/api/v2/trips')
      .set('Content-type', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        seating_capacity: 80,
        origin: "Goma",
        destination: "Kampala",
        trip_date: "08/25/2020",
        fare: 35.000,
        bus_licence_number : 'BL025525688'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an error with 400 status when the user attempt to create a trip with a date that is already passed', (done) => {
    chai
      .request(app)
      .post('/api/v2/trips')
      .set('Content-type', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        seating_capacity: 80,
        origin: "Goma",
        destination: "Kampala",
        trip_date: "08/25/2000",
        fare: 35.000,
        bus_licence_number : 'BL02552545688'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an object with an error property and a 401 status when the user is not authenticated while cancelling a trip', (done) => {
    chai
      .request(app)
      .patch(`/api/v2/trips/${1}/cancel`)
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
      .patch(`/api/v2/trips/${1}/cancel`)
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
      .patch(`/api/v2/trips/trip_id/cancel`)
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
      .patch(`/api/v2/trips/${15548518}/cancel`)
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
      .patch(`/api/v2/trips/${2145422122}/cancel`)
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
      .patch(`/api/v2/trips/${1}/cancel`)
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
      .get(`/api/v2/trips/trip_id/`)
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
      .patch(`/api/v2/trips/${15548518}/cancel`)
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
      .get(`/api/v2/trips/${3}`)
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
      .get(`/api/v2/trips`)
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
      .get(`/api/v2/filter/trips`)
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
      .get(`/api/v2/filter/trips?origin=Goma`)
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
  it('should return an object a 400 status while activating a trip with invalid id format', (done) => {
    chai
      .request(app)
      .patch(`/trips/wrongId/activate`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an object a 404 status while activating a trip that is invalid or does not exist', (done) => {
    chai
      .request(app)
      .patch(`/trips/${255}/activate`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404)
        expect(res.body).to.have.property('error')
        done();
      })
  });
  it('should return an object a 200 status while activating a trip that has valid credentials', (done) => {
    chai
      .request(app)
      .patch(`/trips/${1}/activate`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .send()
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200)
        done();
      })
  });

});
