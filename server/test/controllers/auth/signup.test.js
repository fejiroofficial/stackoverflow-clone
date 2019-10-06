import chai, { expect, request } from 'chai';
import mongoose from 'mongoose';
import chaiHTTP from 'chai-http';
import app from '../../../app';
import User from '../../../models/user';

chai.use(chaiHTTP);

describe('User signup', () => {
    beforeEach(function (done) {

        function clearDB() {
            let promises = [
                User.remove().exec(),
            ];
    
            Promise.all(promises)
                .then(function () {
                    done();
                })
        }
    
        if (mongoose.connection.readyState === 0) {
            mongoose.connect(config.dbUrl, function (err) {
                if (err) {
                    throw err;
                }
                return clearDB();
            });
        } else {
            return clearDB();
        }
    });

  it('if email is not provided', (done) => {
    let user = {
      id: 1,
      firstName: "Okeoghene",
      lastName: "Gospel",
      email: "",
      password: "123456",
      createdAt: "2018-09-02T19:49:33.273Z",
      updatedAt: "2018-09-02T19:49:33.273Z"
    }
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error[0]).to.equal(
            'Email is required but none provided.');
        done();
      });
  });

  it('if password is not provided', (done) => {
    let user = {
      id: 1,
      firstName: "Okeoghene",
      lastName: "Gospel",
      email: "oke@gmail.com",
      password: "",
      createdAt: "2018-09-02T19:49:33.273Z",
      updatedAt: "2018-09-02T19:49:33.273Z"
    }
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error[0]).to.equal('User password must be provided.');
        done();
      })
  })

  it('should register user', (done) => {
    let user = {
      id: 1,
      firstName: 'Okeoghene',
      lastName: 'Gospel',
      email: 'oke@gmail.com',
      password: '123456',
      createdAt: '2018-09-02T19:49:33.273Z',
      updatedAt: '2018-09-02T19:49:33.273Z'
    }
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Account created successfully');
        done();
      });
  });
});
