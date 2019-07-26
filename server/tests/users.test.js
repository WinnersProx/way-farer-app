import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import generator from './generator';
import User from '../models/user';
chai.use(chaiHttp)
const expect = chai.expect;
let authToken;
describe('Auth ', () => {
  before((done) => {
    // signup and get an access token
    generator.generateUsers()
    .user1.then(res => {
      authToken = res.body.token;
      done();
    });
    console.log(authToken);
  });
  // Welcome to WayFarer api feel home

  it('should return an object with a message and 200 status when user accesses the root', (done) => {
      chai
        .request(app)
        .get('/api/v1')
        .set('Content-type', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message');
          done();
        })
  });
  it('should return an object with status 400 when a user signs up without required credentials', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send()
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });
    it('should return an error with 400 when the user attempting to be created already exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send(generator.users.user1)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });
    it('should create a new user with 201 status', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({email : "userTest@gmail.com",first_name:"userTest",last_name:"userTest",password:'testuser12',address:"Goma,NordKivu"})
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data')
          done();
        })
    });
    it('should return an object with an error when the user signs in with an incorrect email', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({email:'winner@hotmail.com', password : 'hotmail@winner'})
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });
    it('should return an object with an error when the user signs in without email or password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({})
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });
    it('should return an object with a data -> token when the user signs in with valid credentials', (done) => {
      const user = User.create(generator.users.user1, 'users');
      const { email } = user;
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({email, password : 'winnerstest'})
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.data).to.have.property('token')
          done();
        })
    });
    it('should return an error with 400 status when signing in with an invalid password', (done) => {
      const user = User.create(generator.users.user1, 'users');
      const { email } = user;
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({email, password : 'winnerstestwrong'})
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });

})