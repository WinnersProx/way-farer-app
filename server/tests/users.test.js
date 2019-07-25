import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index'
chai.use(chaiHttp)
const expect = chai.expect
describe('Auth ', () => {
  
  it('should return an object with status 201 when a user signs up', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({
            email : "test@gmail.com",
            first_name : "UserTestF",
            last_name : "UserTestL",
            password : "secretpass12",
            address : "Kigali KK309"
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body.data).to.have.property('token')
          done();
        })
    })
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
      })
})