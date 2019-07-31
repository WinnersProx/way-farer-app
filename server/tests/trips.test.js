import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import generator from './generator';
import Users from '../models/user';
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
            origin: "Goma Ville",
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
            origin: "Goma Ville",
            destination: "Kampala",
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
            origin: "Goma Ville",
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

})